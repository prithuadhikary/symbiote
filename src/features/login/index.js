import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/outline';
import { Alert, Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useApi from '../../util/useApi';

const Login = () => {
    const { signedUp } = useParams();
    const { post } = useApi();
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await post('/login', data);

            localStorage.setItem('accessToken', response.accessToken);
            navigate('/dashboard');
        } catch (error) {
            setLoginError(error.response.data.errorMessage);
        }
    };

    useEffect(() => {
        setFocus("username");
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className={`text-2xl font-bold text-gray-900 text-center ${signedUp || loginError ? 'mb-3' : 'mb-8'}`}>
                    Login
                </h2>
                {loginError && <Alert className='mt-0 mb-4 text-center' color="failure" icon={ExclamationIcon}>
                    {loginError}
                </Alert>}
                {signedUp && <Toast className='mx-auto mt-0 mb-4 w-full flex justify-center'>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                        <CheckCircleIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Registration successful. Please sign in!</div>
                </Toast>}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username with Email Validation */}
                    <div>
                        <Label htmlFor="username" value="Email Address (Username)" />
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="you@example.com"
                            {...register('username', {
                                required: 'Username is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email format',
                                },
                            })}
                            color={errors.username ? 'failure' : 'default'}
                            helperText={errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required'
                            })}
                            color={errors.password ? 'failure' : 'default'}
                            helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" {...register('remember')} />
                        <Label htmlFor="remember" value="Remember me" />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" color="primary" className="w-full">
                        Log In
                    </Button>

                    {/* Forgot Password */}
                    <div className="text-center text-sm text-gray-600 mt-4">
                        <a href="/forgot-password" className="text-indigo-600 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
