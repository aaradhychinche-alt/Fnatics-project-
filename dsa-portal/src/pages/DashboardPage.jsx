/**
 * FILE: DashboardPage.jsx
 * 
 * Purpose:
 * This is the main dashboard view for the authenticated user.
 * It displays key metrics, performance graphs, topic mastery, and recommended questions.
 * 
 * Key Features:
 * - Fetches real-time user data from Firestore.
 * - Visualizes performance using 'PerformanceOverview' (Recharts).
 * - Shows topic-wise progress bars.
 * - Displays daily streak and goals.
 * - Lists recommended questions (currently mock data, can be connected to logic).
 * 
 * State Management:
 * - stats: Holds aggregated user statistics (total solved, accuracy, streak, etc.).
 * - topics: Holds progress data for each DSA topic.
 * - performanceData: Holds the array of performance objects for the graph.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, CheckCircle, Flame, ArrowUpRight } from 'lucide-react';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import PerformanceOverview from '../components/PerformanceOverview';

// Data / Utils
import { recommendedQuestions } from '../mockData'; // Keeping mock recommendations for now
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

// Streak Calendar Component (Internal helper)
// Visualizes the last 30 days of activity
const generateStreakData = () => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const isActive = Math.random() > 0.3; // Simulation
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            active: isActive,
            count: isActive ? Math.floor(Math.random() * 5) + 1 : 0
        });
    }
    return data;
};

const streakData = generateStreakData();

const StreakCalendar = () => {
    const getIntensityClass = (day, isToday) => {
        if (isToday) {
            return day.active ? 'bg-green-500/90 hover:bg-green-400' : 'bg-red-500/90 hover:bg-red-400';
        }
        if (!day.active) return 'bg-white/5 hover:bg-white/10';
        if (day.count >= 4) return 'bg-green-500/90 hover:bg-green-400';
        if (day.count >= 2) return 'bg-green-500/60 hover:bg-green-400/80';
        return 'bg-green-500/30 hover:bg-green-400/50';
    };

    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-card/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 min-w-[320px]">
            <div className="text-xs font-medium mb-2 text-center">Last 30 Days Activity</div>
            <div className="grid grid-cols-10 gap-1">
                {streakData.map((day, i) => {
                    const isToday = i === streakData.length - 1;
                    return (
                        <div key={`streak-${day.date}-${i}`} className="group relative">
                            <div className={`w-6 h-6 rounded-sm transition-all ${getIntensityClass(day, isToday)}`} />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {day.date}: {day.count} {day.count === 1 ? 'problem' : 'problems'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// StatCard Component
// Reusable card for displaying single metrics
const StatCard = ({ title, value, subtext, icon: Icon, color, showStreakCalendar }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => showStreakCalendar && setIsHovered(true)}
            onMouseLeave={() => showStreakCalendar && setIsHovered(false)}
        >
            <Card className="border-l-4" style={{ borderLeftColor: color }}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <div className="text-2xl font-bold">{value}</div>
                        <span className="text-xs text-muted-foreground">{subtext}</span>
                    </div>
                </CardContent>
            </Card>
            {showStreakCalendar && isHovered && <StreakCalendar />}
        </div>
    );
};

const DashboardPage = () => {
    // State for dashboard metrics
    const [stats, setStats] = useState({
        totalQuestions: 0,
        accuracy: 0,
        streak: 0,
        solvedToday: 0,
        dailyGoal: 5
    });

    // State for topic mastery
    const [topics, setTopics] = useState([
        { name: "Arrays", progress: 0 },
        { name: "DP", progress: 0 },
        { name: "Trees", progress: 0 },
        { name: "Graphs", progress: 0 },
        { name: "Recursion", progress: 0 },
        { name: "Bitmasking", progress: 0 }
    ]);

    // State for performance history graph
    const [performanceData, setPerformanceData] = useState([]);

    // Helper to generate mock performance data if none exists
    // Generates a 7-day dataset with realistic values
    const generateMockPerformanceData = () => {
        const data = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            data.push({
                date: d.toISOString().split('T')[0], // YYYY-MM-DD
                solved: Math.floor(Math.random() * 15) + 5, // Random solved count 5-20
                avg: Math.floor(Math.random() * 20) + 40 // Random avg 40-60
            });
        }
        return data;
    };

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                try {
                    const docRef = doc(db, "users", auth.currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("Dashboard stats loaded:", data);

                        // Update Stats
                        setStats({
                            totalQuestions: data.solvedCount || 0,
                            accuracy: data.accuracy || 0,
                            streak: data.streak || 0,
                            solvedToday: data.dailyGoalProgress || 0,
                            dailyGoal: data.dailyGoalTotal || 5
                        });

                        // Update Topics
                        if (data.dsaProgress) {
                            const progress = data.dsaProgress;
                            setTopics([
                                { name: "Arrays", progress: progress.arrays || 0 },
                                { name: "DP", progress: progress.dp || 0 },
                                { name: "Trees", progress: progress.trees || 0 },
                                { name: "Graphs", progress: progress.graphs || 0 },
                                { name: "Recursion", progress: progress.recursion || 0 },
                                { name: "Bitmasking", progress: progress.bitmasking || 0 }
                            ]);
                        }

                        // Update Performance History
                        // Logic: Check if 'performance' array exists and has data.
                        // If not, generate mock data AND save it to Firestore for persistence.
                        if (data.performance && Array.isArray(data.performance) && data.performance.length > 0) {
                            // Sort by date just in case
                            const sortedData = [...data.performance].sort((a, b) => new Date(a.date) - new Date(b.date));
                            setPerformanceData(sortedData);
                        } else {
                            console.log("No performance data found. Generating fallback and saving to Firestore...");
                            const fallbackData = generateMockPerformanceData();

                            // Update local state immediately
                            setPerformanceData(fallbackData);

                            // Persist to Firestore
                            try {
                                await updateDoc(docRef, {
                                    performance: fallbackData
                                });
                                console.log("Fallback performance data saved to Firestore.");
                            } catch (err) {
                                console.error("Error saving fallback data:", err);
                            }
                        }
                    } else {
                        // New user or no doc, use mock but can't save if doc doesn't exist (should exist from login)
                        setPerformanceData(generateMockPerformanceData());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setPerformanceData(generateMockPerformanceData());
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Download Report</Button>
                    <Button variant="neon">Start Practice</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Solved"
                    value={stats.totalQuestions}
                    subtext="+12 from last week"
                    icon={CheckCircle}
                    color="#10b981"
                />
                <StatCard
                    title="Accuracy"
                    value={`${stats.accuracy}%`}
                    subtext="+2.1% improvement"
                    icon={Target}
                    color="#3b82f6"
                />
                <StatCard
                    title="Current Streak"
                    value={`${stats.streak} Days`}
                    subtext="Keep it up!"
                    icon={Flame}
                    color="#f59e0b"
                    showStreakCalendar={true}
                />
                <StatCard
                    title="Daily Goal"
                    value={`${stats.solvedToday} / ${stats.dailyGoal}`}
                    subtext="2 more to go"
                    icon={Activity}
                    color="#8b5cf6"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Performance Overview Graph (Recharts) */}
                <div className="col-span-4">
                    <PerformanceOverview data={performanceData} />
                </div>

                {/* Topic Mastery Progress */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Topic Mastery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topics.map((topic) => (
                                <div key={topic.name} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{topic.name}</span>
                                        <span className="text-muted-foreground">{topic.progress}%</span>
                                    </div>
                                    <Progress value={topic.progress} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommended Questions & Daily Challenge */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Recommended for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recommendedQuestions.map((q) => (
                                <div key={q.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/50 transition-colors group cursor-pointer">
                                    <div className="space-y-1">
                                        <div className="font-medium group-hover:text-primary transition-colors">{q.title}</div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className={`px-2 py-0.5 rounded-full bg-secondary ${q.difficulty === 'Hard' ? 'text-red-400' :
                                                q.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                            <span>{q.topic}</span>
                                            <span>• Acceptance: {q.acceptance}</span>
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost">
                                        <ArrowUpRight size={18} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Daily Challenge Card */}
                <Card className="col-span-1 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/20">
                    <CardHeader>
                        <CardTitle>Daily Challenge</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-background/50 border border-white/5">
                            <h4 className="font-semibold mb-2">Reverse Nodes in k-Group</h4>
                            <div className="flex gap-2 mb-4">
                                <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">Hard</span>
                                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">+50 XP</span>
                            </div>
                            <Button className="w-full" variant="neon">Solve Now</Button>
                        </div>
                        <div className="text-xs text-center text-muted-foreground">
                            Time remaining: 04:23:12
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
