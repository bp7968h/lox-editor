import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    bg_color: 'gray' | 'blue' | 'red';
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, bg_color, disabled = false, className = "", children }) => {
    const base_classes: string = `inline-flex items-center justify-center font-medium`;
    const size_classes: string = `px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base md:px-6 md:py-3 md:text-lg`;
    const color_classes = {
        gray: 'bg-gray-500 text-white hover:bg-gray-600',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        red: 'bg-red-500 text-white hover:bg-red-600',
    }[bg_color];
    const button_state: string = `${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    const combined_classes: string = `${base_classes} ${color_classes} ${size_classes} ${button_state} ${className}`;

    return (
        <button
            onClick={onClick}
            className={combined_classes}
            disabled={disabled}
        >
            {label} {children}
        </button>
    )
}

export default Button;