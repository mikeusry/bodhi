import type { APIRoute } from 'astro';

const CLOUDINARY_CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.CLOUDINARY_API_SECRET;

export const GET: APIRoute = async ({ url }) => {
  try {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return new Response(JSON.stringify({
        error: 'Missing Cloudinary credentials'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const searchParams = new URL(url).searchParams;
    const action = searchParams.get('action') || 'list';

    // Use basic auth instead of signature
    const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);

    let apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;
    let requestUrl = '';

    if (action === 'list') {
      // List resources with basic parameters - filter to flat_mountain folder only
      requestUrl = `${apiUrl}/resources/image?type=upload&max_results=500&tags=true&prefix=banyan_tree/flat_mountain`;
    } else if (action === 'tags') {
      // Get all tags for flat_mountain folder only
      requestUrl = `${apiUrl}/tags/image?max_results=100`;
    }

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    const responseText = await response.text();

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: `Cloudinary API error: ${response.status} ${response.statusText}`,
        details: responseText,
        url: requestUrl
      }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = JSON.parse(responseText);

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
        width: resource.width,
        height: resource.height,
        format: resource.format,
        bytes: resource.bytes,
        created_at: resource.created_at,
        folder: resource.folder,
        url: resource.secure_url
      }));

      // Group by tags
      const groupedByTags: Record<string, any[]> = {};
      formattedResources.forEach(resource => {
        resource.tags.forEach((tag: string) => {
          if (!groupedByTags[tag]) {
            groupedByTags[tag] = [];
          }
          groupedByTags[tag].push(resource);
        });
      });

      return new Response(JSON.stringify({
        resources: formattedResources,
        groupedByTags,
        total: data.total_count || formattedResources.length
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch Cloudinary data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};