import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Play, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useMockData } from '../context/MockDataContext';

const DifficultyBadge = ({ difficulty }) => {
    const colors = {
        Easy: "bg-green-500/20 text-green-400 border-green-500/30",
        Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Hard: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <span className={`px-2 py-1 rounded text-xs border ${colors[difficulty] || colors.Easy}`}>
            {difficulty}
        </span>
    );
};

import { auth } from '../firebase-config';
import { updateUserStats } from '../firebase-utils';

const DSAQuestionsPage = () => {
    const { dsaQuestions, toggleDsaQuestionStatus } = useMockData();

    const handleToggleStatus = async (question) => {
        // Optimistic UI update
        toggleDsaQuestionStatus(question.id);

        // If we are marking as DONE (current status is not completed)
        if (question.status !== 'completed') {
            if (auth.currentUser) {
                try {
                    await updateUserStats(auth.currentUser.uid, {
                        questionTitle: question.title,
                        questionTopic: question.topic
                    });
                } catch (error) {
                    console.error("Failed to update stats:", error);
                    // Optionally revert UI change here if needed
                }
            }
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">DSA Class Questions</h2>
                    <p className="text-muted-foreground">Practice problems from your college curriculum.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Filter by Topic</Button>
                    <Button variant="outline">Sort by Date</Button>
                </div>
            </div>

            <div className="grid gap-4">
                {dsaQuestions.map((question, index) => (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className={`transition-all hover:border-primary/50 ${question.status === 'completed' ? 'bg-primary/5 border-primary/20' : ''}`}>
                            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">

                                {/* Icon / Status */}
                                <div className={`p-3 rounded-full ${question.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-secondary text-muted-foreground'}`}>
                                    {question.status === 'completed' ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className={`text-lg font-semibold ${question.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}>
                                            {question.title}
                                        </h3>
                                        <DifficultyBadge difficulty={question.difficulty} />
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <span className="text-foreground font-medium">{question.topic}</span>
                                            <span className="opacity-50">•</span>
                                            <span>{question.subtopic}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {question.classDate}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    {/* External Link Button - No internal playground */}
                                    <a href={question.externalLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                                        <Button variant="neon" size="sm" className="w-full">
                                            <Play size={14} className="mr-2" /> Solve Now
                                        </Button>
                                    </a>

                                    <Button
                                        variant={question.status === 'completed' ? "outline" : "secondary"}
                                        size="sm"
                                        onClick={() => handleToggleStatus(question)}
                                        className="w-full md:w-auto"
                                    >
                                        {question.status === 'completed' ? "Mark Undone" : "Mark Done"}
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DSAQuestionsPage;
