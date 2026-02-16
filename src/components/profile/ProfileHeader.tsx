import { User } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Github, MapPin, Link as LinkIcon, Edit } from 'lucide-react';

interface ProfileHeaderProps {
    user: User;
    isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <Avatar
                    src={user.avatarUrl}
                    fallback={user.name.charAt(0)}
                    className="h-24 w-24 border-2 border-indigo-100 sm:h-32 sm:w-32"
                />

                <div className="flex-1 space-y-4 text-center sm:text-left">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                            <p className="text-slate-500">@{user.email.split('@')[0]}</p>
                        </div>

                        <div className="flex gap-2">
                            {isOwnProfile ? (
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <Button size="sm">Follow</Button>
                            )}
                        </div>
                    </div>

                    <p className="max-w-2xl text-slate-600">
                        {user.bio || 'No bio provided yet.'}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 sm:justify-start">
                        {user.githubUrl && (
                            <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                        )}
                        {user.leetCodeUrl && (
                            <a href={user.leetCodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                                <LinkIcon className="h-4 w-4" />
                                LeetCode
                            </a>
                        )}
                        <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            Not Specified
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        {user.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
