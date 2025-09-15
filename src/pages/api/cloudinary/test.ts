import type { APIRoute } from 'astro';

const CLOUDINARY_CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.CLOUDINARY_API_SECRET;

export const GET: APIRoute = async () => {
  try {
    // Simple test without signature - just check credentials
    const timestamp = Math.round(new Date().getTime() / 1000);

    const formData = new FormData();
    formData.append('api_key', CLOUDINARY_API_KEY || '');
    formData.append('timestamp', timestamp.toString());

    // Simple API call to get resources
    const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text();

    return new Response(JSON.stringify({
      status: response.status,
      statusText: response.statusText,
      url: apiUrl,
      credentials: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        api_secret: CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
      },
      response: responseText
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      credentials: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        api_secret: CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};