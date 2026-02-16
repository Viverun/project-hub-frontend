import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pb-24 pt-32 sm:pt-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        Build something <span className="text-indigo-600">amazing</span> together
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-slate-600">
                        The platform for students to showcase projects, find teammates, and grow their skills. Join a community of innovators and builders.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg">Get Started</Button>
                        </Link>
                        <Link href="/projects">
                            <Button size="lg" variant="outline">Browse Projects</Button>
                        </Link>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-2xl">
                        <div className="h-64 w-full rounded-lg bg-indigo-50 sm:h-96 sm:w-[800px]">
                            {/* Image placeholder or illustration */}
                            <div className="flex h-full items-center justify-center text-indigo-200">
                                <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
