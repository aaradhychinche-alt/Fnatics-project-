import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { currentUser, rewards } from '../mockData';

const RewardCard = ({ reward, userXP, onClaim }) => {
    const canAfford = userXP >= reward.xpCost;
    const [claimed, setClaimed] = useState(false);

    const handleClaim = () => {
        if (canAfford && !claimed) {
            setClaimed(true);
            onClaim(reward);
        }
    };

    const getButtonLabel = () => {
        if (claimed) return 'Claimed';
        if (canAfford) return 'Claim Reward';
        return 'Insufficient XP';
    };

    return (
        <div className="group">
            <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                    <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm border border-border text-xs font-medium">
                        {reward.category}
                    </div>
                    {claimed && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="text-green-400 flex items-center gap-2">
                                <CheckCircle size={32} />
                                <span className="text-lg font-semibold">Claimed!</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{reward.description}</p>

                    {/* XP Cost and Button */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-primary">
                            <Sparkles size={18} />
                            <span className="font-bold text-lg">{reward.xpCost} XP</span>
                        </div>
                        <Button
                            variant={claimed ? "outline" : "neon"}
                            size="sm"
                            disabled={!canAfford || claimed}
                            onClick={handleClaim}
                            className="flex-1"
                        >
                            {getButtonLabel()}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const RewardsPage = () => {
    const [userXP, setUserXP] = useState(currentUser.xp);

    const handleClaim = (reward) => {
        setUserXP(prev => prev - reward.xpCost);
    };

    return (
        <div className="space-y-6">
            {/* Header with XP Balance */}
            <div className="flex items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 -mt-6 -mx-6 px-6 border-b border-border/50">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Gift className="text-primary" size={32} />
                        Rewards Marketplace
                    </h2>
                    <p className="text-muted-foreground mt-1">Redeem your XP for exclusive rewards</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg">
                    <div className="text-xs font-medium opacity-90">Current Balance</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles size={20} />
                        {userXP.toLocaleString()} XP
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <Card className="border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 to-purple-900/10">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <Gift size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">How to Earn More XP</h3>
                            <p className="text-sm text-muted-foreground">
                                Solve daily challenges, maintain your streak, and complete problem sets to earn XP. 
                                The harder the problem, the more XP you earn!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Rewards Grid */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Available Rewards</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rewards.map((reward) => (
                        <RewardCard
                            key={reward.id}
                            reward={reward}
                            userXP={userXP}
                            onClaim={handleClaim}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RewardsPage;
