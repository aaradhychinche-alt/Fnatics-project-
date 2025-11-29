import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

const RankIcon = ({ rank }) => {
    if (rank === 1) return <Crown className="text-yellow-400" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return <span className="text-muted-foreground font-bold w-6 text-center">{rank}</span>;
};

const LeaderboardPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "students"), orderBy("leaderboardRank", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const studentsData = [];
            querySnapshot.forEach((doc) => {
                studentsData.push({ id: doc.id, ...doc.data() });
            });
            setStudents(studentsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Global Leaderboard</h2>
                <p className="text-muted-foreground">See where you stand among the best developers.</p>
            </div>

            <Card className="overflow-hidden border-none bg-transparent shadow-none">
                <CardContent className="p-0 space-y-2">
                    {students.map((student, index) => (
                        <motion.div
                            key={student.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center p-4 rounded-xl border transition-all hover:scale-[1.01] bg-card/50 border-border hover:bg-card/80`}
                        >
                            <div className="flex items-center justify-center w-12">
                                <RankIcon rank={student.leaderboardRank} />
                            </div>

                            <div className="flex items-center gap-4 flex-1">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-full border border-white/10 bg-zinc-800"
                                />
                                <div>
                                    <div className="font-semibold flex items-center gap-2">
                                        {student.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">{student.solvedCount} questions solved</div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-bold text-lg text-primary">{student.solvedCount * 10}</div>
                                <div className="text-xs text-muted-foreground">Points</div>
                            </div>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default LeaderboardPage;
