'use client';

import { Card } from '@/components/ui/Card';

interface ProfileStatsProps {
    followers: number;
    following: number;
    projects: number;
}

export function ProfileStats({ followers, following, projects }: ProfileStatsProps) {
    const stats = [
        { label: 'Projects', value: projects },
        { label: 'Followers', value: followers },
        { label: 'Following', value: following },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="flex flex-col items-center justify-center p-4">
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</span>
                </Card>
            ))}
        </div>
    );
}
