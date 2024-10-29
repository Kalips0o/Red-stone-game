import React from "react";
import cn from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'gray' | 'disabled' | 'start';
    isCircle?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    isCircle,
    className,
    ...rest
}: Props) {
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.classList.add(styles.active);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.classList.remove(styles.active);
    };

    return (
        <button
            className={cn(
                styles.button,
                styles[variant],
                {
                    [styles.circle]: isCircle,
                },
                className
            )}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            {...rest}
        >
            {children}
        </button>
    );
}
