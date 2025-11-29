import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, BarChart2, Trophy, Zap, Gift, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import ShaderBackground from '../components/ui/shader-background';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-card/50 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
    >
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </motion.div>
);

const LandingPage = () => {
    return (
    <div className="min-h-screen bg-background landing-bg text-foreground overflow-x-hidden selection:bg-primary/30">
            <ShaderBackground />
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                            <Code size={18} />
                        </div>
                        <span>CodeTrack</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="neon">Login</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[80px] -z-10" />

                <div className="container mx-auto text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Track your DSA Journey. <br />
                            <span className="text-indigo-400">Dominate Your Skills.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                            AI-powered analytics, progress graphs, and personalized weakness detection.
                            Stop guessing, start improving.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" variant="neon" className="h-12 px-8 text-lg">
                                    Start Practicing <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Floating Cards Animation */}
                    <div className="mt-20 relative h-[600px] w-full max-w-5xl mx-auto hidden md:block">
                        {/* Mock UI Interface */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="absolute inset-0 bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden glass-card"
                        >
                            <div className="h-full w-full bg-gradient-to-br from-card to-background p-8 grid grid-cols-3 gap-6 opacity-80">
                                <div className="col-span-1 space-y-4">
                                    <div className="h-32 rounded-lg bg-white/5" />
                                    <div className="h-20 rounded-lg bg-white/5" />
                                    <div className="h-20 rounded-lg bg-white/5" />
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <div className="h-64 rounded-lg bg-white/5" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-32 rounded-lg bg-white/5" />
                                        <div className="h-32 rounded-lg bg-white/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-16 right-20 p-4 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl will-change-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">New Streak!</div>
                                        <div className="text-xs text-indigo-200">12 Days</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-24 left-16 p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl will-change-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <Trophy size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Rank Up</div>
                                        <div className="text-xs text-purple-200">Top 5%</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [-8, 8, -8] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute top-20 left-24 p-4 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-xl will-change-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                                        <Gift size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Rewards</div>
                                        <div className="text-xs text-amber-200">5 Available</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [7, -7, 7] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute bottom-20 right-28 p-4 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl will-change-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">XP Points</div>
                                        <div className="text-xs text-cyan-200">2,450 XP</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-secondary/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={BarChart2}
                            title="Track Submissions"
                            description="Keep a log of every problem you solve across platforms."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Analyze Weakness"
                            description="AI identifies topics where you struggle the most."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Trophy}
                            title="Leaderboard"
                            description="Compete with friends and global peers."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon={Code}
                            title="Smart Suggestions"
                            description="Get recommended problems based on your skill level."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
