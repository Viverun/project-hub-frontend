import axios from 'axios';

export interface LeetCodeStats {
    username: string;
    ranking: number;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    totalEasy: number;
    mediumSolved: number;
    totalMedium: number;
    hardSolved: number;
    totalHard: number;
    acceptanceRate: number;
    contributionPoints: number;
    reputation: number;
}

export interface LeetCodeContestInfo {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
}

export interface LeetCodeFullStats {
    profile: LeetCodeStats;
    contest: LeetCodeContestInfo | null;
    streak: number;
    badges: number;
}

// Using alfa-leetcode-api (reliable public proxy)
// Note: LeetCode doesn't have an official public API, so we use community proxies
const LEETCODE_API = 'https://alfa-leetcode-api.onrender.com';

export const leetcodeApi = {
    async getStats(username: string): Promise<LeetCodeFullStats> {
        try {
            // Fetch user profile stats
            const profileResponse = await axios.get(`${LEETCODE_API}/userProfile/${username}`, {
                timeout: 15000,
            });

            const data = profileResponse.data;

            // Check if user exists
            if (data.errors || !data.totalSolved) {
                throw new Error('User not found');
            }

            // Try to get contest info
            let contestInfo: LeetCodeContestInfo | null = null;
            try {
                const contestResponse = await axios.get(`${LEETCODE_API}/userContestRankingInfo/${username}`, {
                    timeout: 10000,
                });
                const contestData = contestResponse.data?.data?.userContestRanking;
                if (contestData && contestData.rating) {
                    contestInfo = {
                        attendedContestsCount: contestData.attendedContestsCount || 0,
                        rating: Math.round(contestData.rating) || 0,
                        globalRanking: contestData.globalRanking || 0,
                        topPercentage: contestData.topPercentage || 0,
                    };
                }
            } catch {
                // Contest info not available, that's okay
            }

            return {
                profile: {
                    username,
                    ranking: data.ranking || 0,
                    totalSolved: data.totalSolved || 0,
                    totalQuestions: data.totalQuestions || 3846,
                    easySolved: data.easySolved || 0,
                    totalEasy: data.totalEasy || 927,
                    mediumSolved: data.mediumSolved || 0,
                    totalMedium: data.totalMedium || 2010,
                    hardSolved: data.hardSolved || 0,
                    totalHard: data.totalHard || 909,
                    acceptanceRate: data.totalSolved && data.totalSubmissions ? 
                        Math.round((data.totalSolved / data.totalSubmissions[0]?.submissions || 1) * 100 * 10) / 10 : 0,
                    contributionPoints: data.contributionPoint || 0,
                    reputation: data.reputation || 0,
                },
                contest: contestInfo,
                streak: 0, // Not easily available
                badges: 0,
            };
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
            throw new Error('Failed to fetch LeetCode stats. Please check the username.');
        }
    },

    async validateUsername(username: string): Promise<boolean> {
        try {
            const response = await axios.get(`${LEETCODE_API}/${username}`, {
                timeout: 10000,
            });
            return !!response.data?.username;
        } catch {
            return false;
        }
    },

    formatRanking(ranking: number): string {
        if (ranking === 0) return 'Unranked';
        const percentage = (ranking / 1000000) * 100; // Rough estimate
        if (percentage <= 1) return 'Top 1%';
        if (percentage <= 5) return 'Top 5%';
        if (percentage <= 10) return 'Top 10%';
        if (percentage <= 25) return 'Top 25%';
        return `#${ranking.toLocaleString()}`;
    },
};
