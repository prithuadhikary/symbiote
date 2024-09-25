import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/outline';
import { Alert, Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useApi from '../../util/useApi';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../common/LanguageSelect';

const Login = () => {
    const { t } = useTranslation();
    const { signedUp } = useParams();
    const { post } = useApi();
    const [loginError, setLoginError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
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
            if (error.response?.data?.errorMessage) {
                setLoginError(error.response.data.errorMessage);
            } else {
                setLoginError(t('Something went terribly wrong.'));
            }
        }
    };

    useEffect(() => {
        setFocus("username");
    }, [])

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-100 p-6`}>
            <div className={`bg-white rounded-lg shadow-lg w-full max-w-md p-8 transition-opacity duration-300 ${!isLoaded ? 'opacity-0' : ''}`}>
                <h2 className={`text-2xl font-bold text-gray-900 text-center ${signedUp || loginError ? 'mb-0' : 'mb-2'}`}>
                    {t('Login')}
                </h2>
                <div className='flex items-center justify-center pb-2'>
                    <LanguageSelect isLoaded={() => setIsLoaded(true)}/>
                </div>
                {loginError && <Alert className='mt-0 mb-4 text-center' color="failure" icon={ExclamationIcon}>
                    {loginError}
                </Alert>}
                {signedUp && <Toast className='mx-auto mt-0 mb-4 w-full flex justify-center'>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                        <CheckCircleIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">{t('Registration successful. Please sign in!')}</div>
                </Toast>}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username with Email Validation */}
                    <div>
                        <div className="mb-2 block">
                            <Label className='mb-2' htmlFor="username" value={t('Email Address (Username)')} />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="you@example.com"
                            {...register('username', {
                                required: t('Username is required'),
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: t('Invalid email format'),
                                },
                            })}
                            color={errors.username ? 'failure' : 'default'}
                            helperText={errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label className='mb-2' htmlFor="password" value={t('Password')} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: t('Password is required')
                            })}
                            color={errors.password ? 'failure' : 'default'}
                            helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" {...register('remember')} />
                        <Label htmlFor="remember" value={t('Remember me')} />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" color="primary" className="w-full">
                        {t('Login')}
                    </Button>

                    {/* Forgot Password */}
                    <div className="text-center text-sm text-gray-600 mt-4">
                        <a href="/forgot-password" className="text-indigo-600 hover:underline">
                            {t('Forgot your password?')}
                        </a>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        {t("Don't have an account?")}{' '}
                        <Link to="/signup" className="text-indigo-600 hover:underline">
                            {t('Sign up')}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
