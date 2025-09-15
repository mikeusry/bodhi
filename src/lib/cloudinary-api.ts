// Client-side functions to interact with our Cloudinary API endpoints

export interface CloudinaryResource {
  public_id: string;
  tags: string[];
  context: Record<string, any>;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  folder?: string;
  url: string;
}

export interface CloudinaryApiResponse {
  resources?: CloudinaryResource[];
  tags?: string[];
  total: number;
  error?: string;
  details?: string;
}

/**
 * Get all available tags from Cloudinary
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const response = await fetch('/api/cloudinary/tags?action=tags');
    const data: CloudinaryApiResponse = await response.json();

    if (data.error) {
      console.error('Cloudinary API error:', data.error);
      return [];
    }

    return data.tags || [];
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

/**
 * Get all resources from a specific folder with their tags
 */
export async function getResourcesWithTags(folder: string = 'banyan_tree/flat_mountain'): Promise<CloudinaryResource[]> {
  try {
    const response = await fetch(`/api/cloudinary/tags?action=list_resources&folder=${encodeURIComponent(folder)}`);
    const data: CloudinaryApiResponse = await response.json();

    if (data.error) {
      console.error('Cloudinary API error:', data.error);
      return [];
    }

    return data.resources || [];
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    return [];
  }
}

/**
 * Search for resources by tag
 */
export async function searchByTag(tag: string, folder: string = 'banyan_tree/flat_mountain'): Promise<CloudinaryResource[]> {
  try {
    const response = await fetch(`/api/cloudinary/tags?action=search&tag=${encodeURIComponent(tag)}&folder=${encodeURIComponent(folder)}`);
    const data: CloudinaryApiResponse = await response.json();

    if (data.error) {
      console.error('Cloudinary API error:', data.error);
      return [];
    }

    return data.resources || [];
  } catch (error) {
    console.error('Failed to search by tag:', error);
    return [];
  }
}

/**
 * Group resources by their tags for easy room mapping
 */
export async function getResourcesByTags(): Promise<Record<string, CloudinaryResource[]>> {
  try {
    const resources = await getResourcesWithTags();
    const groupedByTags: Record<string, CloudinaryResource[]> = {};

    resources.forEach(resource => {
      resource.tags.forEach(tag => {
        if (!groupedByTags[tag]) {
          groupedByTags[tag] = [];
        }
        groupedByTags[tag].push(resource);
      });
    });

    return groupedByTags;
  } catch (error) {
    console.error('Failed to group resources by tags:', error);
    return {};
  }
}

/**
 * Debug function to log all tags and their associated images
 */
export async function debugCloudinaryTags(): Promise<void> {
  try {
    console.log('🔍 Fetching all Cloudinary tags and resources...');

    const [allTags, groupedResources] = await Promise.all([
      getAllTags(),
      getResourcesByTags()
    ]);

    console.log('📋 All available tags:', allTags);
    console.log('🏠 Resources grouped by tags:', groupedResources);

    // Log each tag with its images
    Object.entries(groupedResources).forEach(([tag, resources]) => {
      console.log(`\n🏷️ Tag: "${tag}" (${resources.length} images):`);
      resources.forEach(resource => {
        console.log(`  📸 ${resource.public_id}`);
      });
    });

  } catch (error) {
    console.error('Failed to debug tags:', error);
  }
}