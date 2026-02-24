import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_URL } from '../config';
import ActivityDetail from './ActivityDetail';
import Activities from './Activities';
import Events from './Events';
import Contact from './Contact';

interface Activity {
    id: number;
    title: string;
    activityName: string;
    description: string;
    activityDate: string;
    location: string;
    category_name?: string;
    image: string;
}

const getFallbackImage = () => {
    return '/activity_demo.png'; // Use local fallback
};

export default function ActivityPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            if (!id) return;
            setLoading(true);

            try {
                // Determine if we are looking for an activity or an event based on the URL
                const isEventPath = window.location.pathname.includes('/event/');
                const directUrl = isEventPath
                    ? API_ENDPOINTS.EVENT_DETAIL(id)
                    : API_ENDPOINTS.ACTIVITY_DETAIL(id);

                // Strategy 1: Try direct detail endpoint
                let found = null;
                try {
                    const response = await fetch(directUrl);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && data.status && data.data) {
                            // Handle both single object and array-of-one responses
                            found = Array.isArray(data.data) ? data.data[0] : data.data;
                        }
                    }
                } catch (directError) {
                    console.warn('Direct detail fetch failed, trying fallback list...', directError);
                }

                // Strategy 2: Fallback to fetching all items if direct fetch failed
                if (!found) {
                    const listUrl = isEventPath ? API_ENDPOINTS.EVENTS : API_ENDPOINTS.ACTIVITIES;
                    try {
                        const response = await fetch(listUrl);
                        if (response.ok) {
                            const data = await response.json();
                            if (data && data.data && Array.isArray(data.data)) {
                                found = data.data.find((item: any) => {
                                    const title = item.activity_name || item.title || item.event_name || item.name || '';
                                    const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                                    // Check all possible ID/Slug fields
                                    return (
                                        item.slug === id ||
                                        item.activity_slug === id ||
                                        item.event_slug === id ||
                                        generatedSlug === id ||
                                        item.id === Number(id) ||
                                        item.id === id
                                    );
                                });
                            }
                        }
                    } catch (listError) {
                        console.error('Fallback list fetch failed:', listError);
                    }
                }

                if (found) {
                    const title = found.activity_name || found.title || found.event_name || found.name || '';

                    let imageUrl = '';
                    // Prioritize banner_path for the hero section
                    const path = found.banner_path || found.thumbnail_path || found.image_path || found.image;

                    if (path) {
                        if (path.startsWith('http')) {
                            imageUrl = path;
                        } else {
                            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
                            imageUrl = `${STORAGE_URL}/${cleanPath}`;
                        }
                    } else {
                        imageUrl = getFallbackImage();
                    }

                    setActivity({
                        id: found.id,
                        title: title,
                        activityName: title,
                        description: found.shortnote || found.description || found.content || '',
                        activityDate: found.activity_date || found.event_date || found.date || '',
                        location: found.location || found.venue || '',
                        category_name: found.category?.category_name || found.category_name || (isEventPath ? 'Event' : 'Activity'),
                        image: imageUrl
                    });
                } else {
                    console.error('Activity not found in direct or fallback fetch.');
                    setActivity(null);
                }
            } catch (error) {
                console.error('Error in fetchActivity:', error);
                setActivity(null);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    return (
        <>
            <ActivityDetail
                activity={activity}
                onBack={() => navigate(-1)}
                isEvent={window.location.pathname.includes('/event/')}
            />
            <div className="bg-white">
                <Activities />
                <Events />
                <Contact />
            </div>
        </>
    );
}
