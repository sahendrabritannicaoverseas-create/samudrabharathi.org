// API Configuration
// Change this URL to switch between different backend servers
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://admin.samudrabharathi.org/api';
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'https://admin.samudrabharathi.org/storage';

export const API_ENDPOINTS = {
  GALLERY: `${API_BASE_URL}/gallery`,
  VIDEOS: `${API_BASE_URL}/videos`,
  ACTIVITIES: `${API_BASE_URL}/activities`,
  ACTIVITY_CATEGORIES: `${API_BASE_URL}/activity-categories`,
  EVENTS: `${API_BASE_URL}/events`,
  EVENT_CATEGORIES: `${API_BASE_URL}/event-categories`,
  // Dynamic endpoint helpers
  ACTIVITY_DETAIL: (slug: string) => `${API_BASE_URL}/activity/${slug}`,
  EVENT_DETAIL: (slug: string) => `${API_BASE_URL}/event/${slug}`,
  ACTIVITIES_BY_CATEGORY: (id: number | string) => `${API_BASE_URL}/activities/${id}`,
  EVENTS_BY_CATEGORY: (id: number | string) => `${API_BASE_URL}/events/${id}`,
};
