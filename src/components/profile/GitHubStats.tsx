import { Github, Star, GitFork, BookOpen } from 'lucide-react';

interface GitHubStatsProps {
    username?: string;
}

export function GitHubStats({ username }: GitHubStatsProps) {
    if (!username) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    GitHub Stats
                </h3>
                <div className="flex flex-col h-32 items-center justify-center rounded-lg bg-slate-50 text-center p-4">
                    <p className="text-sm text-slate-500 mb-2">Connect your GitHub to showcase your repositories</p>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Link Account</button>
                </div>
            </div>
        );
    }

    // Mock stats for showcase
    const stats = {
        repos: 24,
        stars: 156,
        forks: 42,
        contributions: 840
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-xs font-medium">Repos</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{stats.repos}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-amber-500 mb-1">
                        <Star className="h-4 w-4" />
                        <span className="text-xs font-medium text-slate-500">Stars</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{stats.stars}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-indigo-500 mb-1">
                        <GitFork className="h-4 w-4" />
                        <span className="text-xs font-medium text-slate-500">Forks</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{stats.forks}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-slate-500">Events</span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">{stats.contributions}</span>
                </div>
            </div>
        </div>
    );
}
