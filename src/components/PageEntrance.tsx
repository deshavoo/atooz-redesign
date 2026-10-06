"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function PageEntrance({
    children,
}: {
    children: React.ReactNode;
}) {
    const shouldReduceMotion = useReducedMotion();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsReady(true);
        }, 50);

        return () => window.clearTimeout(timer);
    }, []);

    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
                opacity: isReady ? 1 : 0,
                y: isReady ? 0 : 12,
            }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
