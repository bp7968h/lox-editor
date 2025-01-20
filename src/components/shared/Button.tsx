import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    bg_color: 'destructive' | 'blue' | 'group';
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, bg_color, disabled = false, className = "", children }) => {
    const base_classes: string = `inline-flex items-center justify-center text-sm font-medium font-mono rounded`;
    const size_classes: string = `px-2 py-1 text-sm font-medium sm:px-4 sm:py-2 sm:text-base md:h-9 md:px-4 md:py-2 md:text-lg`;
    const color_classes = {
        group: 'bg-group text-white hover:bg-group/90',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',

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
};

export default Button;