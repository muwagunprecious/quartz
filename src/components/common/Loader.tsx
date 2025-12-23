import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const spinner = (
        <div className={`
            animate-spin rounded-full 
            border-gray-200 border-t-primary 
            ${sizeClasses[size]} 
            ${className}
        `} />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-4">
            {spinner}
        </div>
    );
};

export default Loader;
