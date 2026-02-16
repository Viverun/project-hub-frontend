'use client';

import { Search } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';

export function DashboardNavbar() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <MobileMenu />
                <div className="hidden sm:flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-slate-500">
                    <Search className="h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="bg-transparent text-sm outline-none w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NotificationBell />

                <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                    <div className="hidden text-right lg:block">
                        <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Avatar
                        src={user?.avatarUrl}
                        fallback={user?.name?.charAt(0) || 'U'}
                        className="h-9 w-9 border border-slate-200"
                    />
                </div>
            </div>
        </header>
    );
}
