import type { APIRoute } from 'astro';

const CLOUDINARY_CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.CLOUDINARY_API_SECRET;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Check if we have the required credentials
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return new Response(JSON.stringify({
        error: 'Missing Cloudinary credentials. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET environment variables.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const searchParams = new URL(request.url).searchParams;
    const tag = searchParams.get('tag');
    const folder = searchParams.get('folder') || 'banyan_tree/flat_mountain';
    const action = searchParams.get('action') || 'list_resources';

    // Create timestamp and signature for Cloudinary API
    const timestamp = Math.round(new Date().getTime() / 1000);

    let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;
    let params: Record<string, string> = {
      api_key: CLOUDINARY_API_KEY,
      timestamp: timestamp.toString(),
    };

    if (action === 'list_resources') {
      // List all resources in folder
      apiUrl += '/resources/image';
      params = {
        ...params,
        type: 'upload',
        prefix: folder,
        max_results: '100',
        tags: 'true', // Include tags in response
        context: 'true', // Include context metadata
      };
    } else if (action === 'search' && tag) {
      // Search by specific tag
      apiUrl += '/resources/search';
      params = {
        ...params,
        expression: `tags=${tag}`,
        max_results: '100',
      };
    } else if (action === 'tags') {
      // Get all tags
      apiUrl += '/tags/image';
      params = {
        ...params,
        max_results: '100',
      };
    }

    // Generate signature
    const signature = await generateSignature(params, CLOUDINARY_API_SECRET);
    params.signature = signature;

    // Make request to Cloudinary
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Format the response
    if (action === 'tags') {
      return new Response(JSON.stringify({
        tags: data.tags || [],
        total: data.tags?.length || 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const resources = data.resources || [];
      const formattedResources = resources.map((resource: any) => ({
        public_id: resource.public_id,
        tags: resource.tags || [],
        context: resource.context || {},
        width: resource.width,
        height: resource.height,
        format: resource.format,
        bytes: resource.bytes,
        created_at: resource.created_at,
        folder: resource.folder,
        url: resource.secure_url
      }));

      return new Response(JSON.stringify({
        resources: formattedResources,
        total: data.total_count || formattedResources.length
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Cloudinary API error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch Cloudinary data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper function to generate Cloudinary signature
async function generateSignature(params: Record<string, string>, apiSecret: string): Promise<string> {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const stringToSign = sortedParams + apiSecret;

  // Create SHA-1 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}