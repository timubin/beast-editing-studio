import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconRendererProps extends LucideProps {
    name: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ name, ...props }) => {
    // @ts-ignore
    const IconComponent = Icons[name];

    if (!IconComponent) {
        return <Icons.HelpCircle {...props} />;
    }

    return <IconComponent {...props} />;
};

export default IconRenderer;
