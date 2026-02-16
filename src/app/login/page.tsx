import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';
import { Shield, Zap } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Left Side: Illustration / Gradient */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-700 via-violet-800 to-fuchsia-900 p-12 text-white relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="text-3xl font-bold tracking-tight">APSIT Student Sphere</Link>
                    <div className="mt-20 space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-extrabold leading-tight">Welcome back to the future of collaboration.</h2>
                            <p className="text-indigo-100 text-lg max-w-md italic">&quot;Building the next big thing starts with finding the right people. You&apos;re just one login away.&quot;</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">Fast Discovery</p>
                                    <p className="text-indigo-200 text-sm">Find projects that match your stack in seconds.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Shield className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-semibold">Secure Teams</p>
                                    <p className="text-indigo-200 text-sm">Verified student profiles and managed join requests.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-indigo-300 text-xs">
                    &copy; {new Date().getFullYear()} APSIT Student Sphere. All rights reserved.
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/50">
                <div className="w-full max-w-md">
                    <div className="md:hidden mb-8 text-center text-indigo-600 font-bold text-2xl">
                        APSIT Student Sphere
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
