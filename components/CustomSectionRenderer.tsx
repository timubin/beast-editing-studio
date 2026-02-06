import React from 'react';

interface CustomSectionRendererProps {
    content: string;
    addWrapper?: boolean;
}

const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({ content, addWrapper = true }) => {
    if (addWrapper) {
        return (
            <section
                className="w-full"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default CustomSectionRenderer;
