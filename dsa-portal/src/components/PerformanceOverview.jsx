/**
 * FILE: PerformanceOverview.jsx
 * 
 * Purpose:
 * Renders a premium, interactive line chart visualizing user performance vs. class average.
 * Uses 'recharts' for responsive, smooth, and accessible data visualization.
 * 
 * Features:
 * - Smooth curved lines (monotone).
 * - Gradient fills for a modern "neon" aesthetic.
 * - Custom tooltips that appear on hover.
 * - Auto-scaling Y-axis based on data range.
 * - Responsive container to fit any screen size.
 * 
 * Props:
 * - data: Array of objects containing { date, solved, avg }.
 */

// Recharts imports fixed to prevent ReferenceError: AreaChart is not defined

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

// Custom Tooltip Component
// Displays detailed info when hovering over a data point
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-popover/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl text-xs">
                <p className="font-semibold mb-1 text-foreground">{label}</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-indigo-300">You: {payload[0].value}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    <span className="text-pink-300">Avg: {payload[1].value}</span>
                </div>
            </div>
        );
    }
    return null;
};

const PerformanceOverview = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground text-sm">
                No performance data available.
            </div>
        );
    }

    return (
        <div className="w-full h-[300px] bg-card/50 backdrop-blur-sm rounded-xl border border-white/5 shadow-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
                        <span className="text-muted-foreground">You</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
                        <span className="text-muted-foreground">Class Avg</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                            dy={10}
                            tickFormatter={(value) => {
                                try {
                                    const date = new Date(value);
                                    if (isNaN(date.getTime())) return value;
                                    return date.toLocaleDateString('en-US', { weekday: 'short' });
                                } catch (e) {
                                    return value;
                                }
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />

                        {/* Class Average Area & Line */}
                        <Area
                            type="monotone"
                            dataKey="avg"
                            stroke="#EC4899"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorAvg)"
                        />

                        {/* User Performance Area & Line */}
                        <Area
                            type="monotone"
                            dataKey="solved"
                            stroke="#8B5CF6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorSolved)"
                            dot={{ r: 4, fill: '#1e1b4b', stroke: '#8B5CF6', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceOverview;
