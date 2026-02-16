'use client';

import { JoinRequest } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Check, X, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import { useState } from 'react';
import { teamApi } from '@/api/team';

interface JoinRequestCardProps {
    request: JoinRequest;
    onAccept?: (requestId: string) => void;
    onReject?: (requestId: string) => void;
}

export function JoinRequestCard({ request, onAccept, onReject }: JoinRequestCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async (status: 'ACCEPTED' | 'REJECTED') => {
        setIsLoading(true);
        try {
            await teamApi.updateRequestStatus(request.id, status);
            if (status === 'ACCEPTED' && onAccept) onAccept(request.id);
            if (status === 'REJECTED' && onReject) onReject(request.id);
        } catch (error) {
            console.error(`Failed to ${status.toLowerCase()} request:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={request.user?.avatarUrl}
                        fallback={request.user?.name?.charAt(0) || request.userId.charAt(0)}
                        className="h-10 w-10 border border-slate-100"
                    />
                    <div>
                        <h4 className="font-semibold text-slate-900">{request.user?.name || `User ID: ${request.userId}`}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatRelativeTime(request.createdAt)}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                            <span className="text-xs font-bold text-indigo-600 uppercase">
                                {request.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 italic text-sm text-slate-600">
                &quot;{request.message}&quot;
            </div>

            <div className="flex gap-2">
                <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleAction('ACCEPTED')}
                    isLoading={isLoading}
                >
                    <Check className="h-4 w-4" />
                    Accept
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleAction('REJECTED')}
                    isLoading={isLoading}
                >
                    <X className="h-4 w-4" />
                    Decline
                </Button>
            </div>
        </div>
    );
}
