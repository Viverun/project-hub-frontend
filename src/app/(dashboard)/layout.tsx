import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardNavbar } from '@/components/layout/DashboardNavbar';
import { Footer } from '@/components/layout/Footer';
import { AnimatedTransitions } from '@/components/ui/AnimatedTransitions';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardNavbar />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
                        <AnimatedTransitions>
                            {children}
                        </AnimatedTransitions>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
