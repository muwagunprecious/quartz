import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[6px] transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-inter tracking-wide uppercase';

    const variants = {
        primary: 'bg-primary text-white hover:bg-orange-600',
        secondary: 'bg-secondary text-white hover:bg-green-700',
        outline: 'border border-primary text-primary bg-transparent hover:bg-orange-50',
        ghost: 'text-textprimary hover:bg-gray-100 bg-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm', // 40px default
        lg: 'h-12 px-6 text-base', // 48px large
        icon: 'h-10 w-10 p-2',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
}
