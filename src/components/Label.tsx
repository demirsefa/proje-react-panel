import React from 'react';

interface LabelProps {
    htmlFor: string;
    label?: string;
    fieldName: string;
}

export function Label({ htmlFor, label, fieldName }: LabelProps) {
    return (
        <label htmlFor={htmlFor}>
            {label ?? fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        </label>
    );
} 