import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const AITopicAnalysis = () => {
    const [analysis, setAnalysis] = useState({
        weak: [],
        medium: [],
        strong: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!auth.currentUser) return;

            try {
                const docRef = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const progress = data.dsaProgress || {};

                    const newAnalysis = {
                        weak: [],
                        medium: [],
                        strong: []
                    };

                    // Process dsaProgress if available
                    Object.entries(progress).forEach(([topic, score]) => {
                        // Capitalize topic name
                        const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

                        if (score >= 70) {
                            newAnalysis.strong.push({ name: formattedTopic, score });
                        } else if (score >= 40) {
                            newAnalysis.medium.push({ name: formattedTopic, score });
                        } else {
                            newAnalysis.weak.push({ name: formattedTopic, score });
                        }
                    });

                    // Fallback: Use explicit weak/strong arrays if progress didn't cover them
                    // This ensures we show something if dsaProgress is empty but arrays exist
                    if (data.weakTopics && Array.isArray(data.weakTopics)) {
                        data.weakTopics.forEach(t => {
                            if (!newAnalysis.weak.find(x => x.name === t)) {
                                newAnalysis.weak.push({ name: t, score: 0 }); // Default low score
                            }
                        });
                    }
                    if (data.strongTopics && Array.isArray(data.strongTopics)) {
                        data.strongTopics.forEach(t => {
                            if (!newAnalysis.strong.find(x => x.name === t)) {
                                newAnalysis.strong.push({ name: t, score: 85 }); // Default high score
                            }
                        });
                    }

                    setAnalysis(newAnalysis);
                }
            } catch (error) {
                console.error("Error fetching topic analysis:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    if (loading) {
        return <div className="h-40 w-full animate-pulse bg-card/50 rounded-xl border border-white/5" />;
    }

    // If no data at all
    if (analysis.weak.length === 0 && analysis.medium.length === 0 && analysis.strong.length === 0) {
        return null;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Card className="w-full bg-card/50 backdrop-blur-sm border-white/5 shadow-lg overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Brain size={20} />
                    </div>
                    <CardTitle className="text-lg font-semibold">AI Topic Analysis</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 md:grid-cols-3"
                >
                    {/* Weak Topics */}
                    <motion.div variants={item} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                            <AlertCircle size={16} />
                            <span>Needs Focus (0-39%)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {analysis.weak.length > 0 ? (
                                analysis.weak.map((t, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-medium">
                                        {t.name} <span className="opacity-50 ml-1">{t.score}%</span>
                                    </div>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground italic">No weak topics identified.</span>
                            )}
                        </div>
                    </motion.div>

                    {/* Medium Topics */}
                    <motion.div variants={item} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-yellow-400">
                            <TrendingUp size={16} />
                            <span>Improving (40-69%)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {analysis.medium.length > 0 ? (
                                analysis.medium.map((t, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300 font-medium">
                                        {t.name} <span className="opacity-50 ml-1">{t.score}%</span>
                                    </div>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground italic">No topics in this range.</span>
                            )}
                        </div>
                    </motion.div>

                    {/* Strong Topics */}
                    <motion.div variants={item} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                            <CheckCircle2 size={16} />
                            <span>Strong (70-100%)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {analysis.strong.length > 0 ? (
                                analysis.strong.map((t, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-300 font-medium">
                                        {t.name} <span className="opacity-50 ml-1">{t.score}%</span>
                                    </div>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground italic">Keep practicing to master topics!</span>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </CardContent>
        </Card>
    );
};

export default AITopicAnalysis;
