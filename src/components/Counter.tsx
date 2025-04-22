import React, { useState, useEffect } from 'react';

interface CounterProps {
    image: React.ReactNode;
    text: string;
    targetNumber: number;
    duration?: number;
}

export function Counter({ image, text, targetNumber, duration = 2000 }: CounterProps) {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        let startTime: number;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            setCount(Math.floor(percentage * targetNumber));

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [targetNumber, duration]);

    return (
        <div className="counter-container">
            <div className="counter-image">
                {image}
            </div>
            <div className="counter-text">
                {text}
            </div>
            <div className="counter-value">
                {count}
            </div>
        </div>
    );
}
