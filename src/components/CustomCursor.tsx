"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const targetX = useRef(0);
    const targetY = useRef(0);
    const currentX = useRef(0);
    const currentY = useRef(0);
    const animationFrame = useRef<number | null>(null);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const handleMouseMove = (event: MouseEvent) => {
            targetX.current = event.clientX;
            targetY.current = event.clientY;
        };

        const animate = () => {
            currentX.current += (targetX.current - currentX.current) * 0.14;
            currentY.current += (targetY.current - currentY.current) * 0.14;

            cursor.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;

            animationFrame.current = requestAnimationFrame(animate);
        };

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            const interactive = target.closest(
                "a, button, [role='button'], input, textarea, select"
            );

            cursor.classList.toggle("cursor-hover", !!interactive);
        };

        const handleMouseLeave = () => {
            cursor.classList.add("cursor-hidden");
        };

        const handleMouseEnter = () => {
            cursor.classList.remove("cursor-hidden");
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.removeEventListener(
                "mouseleave",
                handleMouseLeave
            );
            document.documentElement.removeEventListener(
                "mouseenter",
                handleMouseEnter
            );

            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="custom-cursor"
        >
            <span />
        </div>
    );
}