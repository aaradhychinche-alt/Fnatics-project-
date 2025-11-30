/**
 * FILE: PerformanceChart.jsx
 * 
 * Purpose:
 * Renders a custom line chart to visualize user performance against class average.
 * 
 * Features:
 * - Uses 'framer-motion' for smooth animations.
 * - Displays two lines: User (Blue) and Class Average (Purple).
 * - Shows data points on hover.
 * - Responsive SVG scaling.
 * 
 * Props:
 * - userHistory: Object containing date-score pairs (e.g., { "2025-11-21": 80, ... })
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const PerformanceChart = ({ userHistory }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Process data for the chart
    const data = useMemo(() => {
        if (!userHistory) return [];

        // Sort dates to ensure chronological order
        const sortedDates = Object.keys(userHistory).sort();

        // Generate mock class average data for comparison
        // In a real app, this would come from the backend
        return sortedDates.map(date => ({
            date,
            userScore: userHistory[date] || 0,
            classAverage: Math.floor(Math.random() * (85 - 60 + 1)) + 60, // Random avg between 60-85
            label: date.split('-').slice(1).join('/') // MM/DD format
        }));
    }, [userHistory]);

    if (data.length === 0) {
        return (
            <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground text-sm">
                No performance data available yet.
            </div>
        );
    }

    // Chart dimensions
    const height = 200;
    const width = 100; // Percent
    const padding = 20;
    const maxY = 100;

    // Helper to calculate Y position
    const getY = (score) => height - (score / maxY) * height;

    // Generate SVG path for a dataset
    const createPath = (key) => {
        return data.map((point, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = getY(point[key]);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };

    const userPath = createPath('userScore');
    const classPath = createPath('classAverage');

    return (
        <div className="w-full h-[250px] relative select-none">
            {/* Legend */}
            <div className="flex items-center justify-end gap-4 mb-2 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">You</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-muted-foreground">Class Avg</span>
                </div>
            </div>

            {/* Chart Area */}
            <svg className="w-full h-[200px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 200">
                {/* Grid Lines */}
                {[0, 25, 50, 75, 100].map(val => (
                    <line
                        key={val}
                        x1="0"
                        y1={getY(val)}
                        x2="100"
                        y2={getY(val)}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeWidth="0.5"
                    />
                ))}

                {/* Class Average Line (Purple) */}
                <motion.path
                    d={classPath}
                    fill="none"
                    stroke="#a855f7" // Purple-500
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* User Score Line (Blue) */}
                <motion.path
                    d={userPath}
                    fill="none"
                    stroke="#3b82f6" // Blue-500
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />

                {/* Interactive Points */}
                {data.map((point, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const yUser = getY(point.userScore);
                    const yClass = getY(point.classAverage);

                    return (
                        <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                            {/* Invisible hover target */}
                            <rect x={x - 5} y="0" width="10" height="200" fill="transparent" cursor="pointer" />

                            {/* Dots (Visible on hover or always small?) */}
                            <circle cx={x} cy={yUser} r="3" fill="#3b82f6" className="transition-all duration-300" />
                            <circle cx={x} cy={yClass} r="2" fill="#a855f7" opacity="0.5" />

                            {/* Tooltip */}
                            {hoveredIndex === i && (
                                <foreignObject x={x > 50 ? x - 40 : x} y={0} width="40" height="100%" style={{ overflow: 'visible' }}>
                                    <div className={`absolute -top-10 ${x > 50 ? '-left-full' : 'left-0'} bg-popover text-popover-foreground text-[10px] p-2 rounded shadow-lg border border-border whitespace-nowrap z-50`}>
                                        <div className="font-bold mb-1">{point.label}</div>
                                        <div className="text-blue-400">You: {point.userScore}</div>
                                        <div className="text-purple-400">Avg: {point.classAverage}</div>
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-2 px-2 text-[10px] text-muted-foreground">
                {data.map((point, i) => (
                    <span key={i}>{point.label}</span>
                ))}
            </div>
        </div>
    );
};

export default PerformanceChart;
