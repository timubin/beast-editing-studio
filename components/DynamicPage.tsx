import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContext';
import CustomSectionRenderer from './CustomSectionRenderer';

const DynamicPage: React.FC = () => {
    const { path } = useParams<{ path: string }>();
    const { customSections } = useSiteContent();

    // Find the matching page
    const page = customSections.find(s => s.type === 'page' && s.path === path && s.isVisible);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    if (!page) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center pt-32">
                <div className="text-center">
                    <h1 className="text-6xl font-black text-red-600 mb-4">404</h1>
                    <p className="text-xl text-zinc-500">Page not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <CustomSectionRenderer content={page.content} addWrapper={false} />
        </div>
    );
};

export default DynamicPage;
