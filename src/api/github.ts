import axios from 'axios';

export interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
}

export interface GitHubRepo {  
    id: number; 
    name: string; 
    full_name: string; 
    description: string; 
    html_url: string; 
    stargazers_count: number;  
    forks_count: number;  
    language: string; 
    updated_at: string; 
} 

export interface GitHubStats {
    user: GitHubUser;
    repos: number;
    totalStars: number;
    totalForks: number;
    topLanguages: { name: string; count: number }[];
    recentRepos: GitHubRepo[];
    contributionsThisYear: number;
}

const GITHUB_API = 'https://api.github.com';

export const githubApi = {
    async getUser(username: string): Promise<GitHubUser> {
        const response = await axios.get(`${GITHUB_API}/users/${username}`);
        return response.data;
    },

    async getRepos(username: string): Promise<GitHubRepo[]> {
        const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
            params: {
                sort: 'updated',
                per_page: 100,
            },
        });
        return response.data;
    },

    async getStats(username: string): Promise<GitHubStats> {
        try {
            const [user, repos] = await Promise.all([
                this.getUser(username),
                this.getRepos(username),
            ]);

            // Calculate total stars and forks
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

            // Calculate top languages
            const languageCounts: Record<string, number> = {};
            repos.forEach((repo) => {
                if (repo.language) {
                    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                }
            });

            const topLanguages = Object.entries(languageCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Get recent repos
            const recentRepos = repos.slice(0, 5);

            // Estimate contributions (GitHub doesn't provide this via API without auth)
            // This is a rough estimate based on repo activity
            const contributionsThisYear = repos.length * 50; // Rough estimate

            return {
                user,
                repos: user.public_repos,
                totalStars,
                totalForks,
                topLanguages,
                recentRepos,
                contributionsThisYear,
            };
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            throw error;
        }
    },

    async validateUsername(username: string): Promise<boolean> {
        try {
            await this.getUser(username);
            return true;
        } catch {
            return false;
        }
    },
};
