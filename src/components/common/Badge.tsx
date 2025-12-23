import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'neutral' | 'outline' | 'danger';
    className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
    const variants = {
        primary: 'bg-primary text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        danger: 'bg-red-600 text-white',
        neutral: 'bg-gray-100 text-textmuted',
        outline: 'border border-primary text-primary bg-transparent',
    };

    return (
        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-md ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
