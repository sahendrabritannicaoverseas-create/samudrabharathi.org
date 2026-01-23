// API Configuration
// Change this URL to switch between different backend servers
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.adminsb.tutelagestudy.com/api';

// Storage Configuration
// Change this URL for image storage domain
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'https://www.adminsb.tutelagestudy.com/storage';

export const API_ENDPOINTS = {
  GALLERY: `${API_BASE_URL}/gallery`,
  VIDEOS: `${API_BASE_URL}/videos`,
  ACTIVITIES: `${API_BASE_URL}/activities`,
  ACTIVITY_CATEGORIES: `${API_BASE_URL}/activity-categories`,
};
