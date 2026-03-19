'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

import { UserRole } from '@/types';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['STUDENT', 'DEPARTMENT']),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

export function LoginForm() {
    const { login, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            role: 'STUDENT',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setError(null);
        try {
            await login(data);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string | Record<string, unknown> } } };
            const message = error.response?.data?.message;
            if (typeof message === 'string') {
                setError(message);
                return;
            }

            if (message && typeof message === 'object') {
                const firstKey = Object.keys(message)[0] as keyof typeof message;
                const raw = message[firstKey];
                if (Array.isArray(raw) && raw.length > 0) {
                    setError(String(raw[0]));
                    return;
                }
                if (typeof raw === 'string') {
                    setError(raw);
                    return;
                }
            }

            setError('Login failed. Please check credentials and try again.');
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-xl border-slate-200/60 transition-all duration-300">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-bold tracking-tight">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                    Enter your credentials to continue your journey
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="space-y-4"
                    >
                        {error && (
                            <motion.div
                                variants={itemVariants}
                                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="flex p-1 bg-slate-100/80 rounded-xl mb-4 backdrop-blur-sm">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedRole('STUDENT');
                                    setValue('role', 'STUDENT');
                                }}
                                className={cn(
                                    "flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300",
                                    selectedRole === 'STUDENT' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedRole('DEPARTMENT');
                                    setValue('role', 'DEPARTMENT');
                                }}
                                className={cn(
                                    "flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300",
                                    selectedRole === 'DEPARTMENT' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                Department
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder={selectedRole === 'STUDENT' ? "moodleID@apsit.edu.in" : "dept@apsit.edu.in"}
                                error={errors.email?.message}
                                {...register('email')}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none text-slate-700">Password</label>
                                <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register('password')}
                            />
                        </motion.div>
                    </motion.div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-2">
                    <Button type="submit" className="w-full h-11 transform transition-all active:scale-[0.98]" isLoading={isLoading}>
                        Sign In
                    </Button>
                    <p className="text-center text-sm text-slate-500 font-medium">
                        New to the platform?{' '}
                        <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline transition-all">
                            Join APSIT Sphere
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
