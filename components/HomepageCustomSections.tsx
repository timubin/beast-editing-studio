import React from 'react';
import { useSiteContent } from '../context/SiteContext';
import CustomSectionRenderer from './CustomSectionRenderer';

const HomepageCustomSections: React.FC = () => {
    const { customSections } = useSiteContent();

    // Filter generic sections
    const sections = customSections.filter(s => s.type === 'section' && s.isVisible);

    if (sections.length === 0) return null;

    return (
        <>
            {sections.map(section => (
                <CustomSectionRenderer key={section.id} content={section.content} />
            ))}
        </>
    );
};

export default HomepageCustomSections;
