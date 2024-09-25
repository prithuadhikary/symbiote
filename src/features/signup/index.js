import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Alert, Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../util/useApi';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../common/LanguageSelect';
import { ExclamationIcon } from '@heroicons/react/outline';
;

const Signup = () => {
    const { t } = useTranslation();
    const { post, get } = useApi();
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setFocus,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await post('/signup', data);
            console.log(response);
            navigate("/login/true");
        } catch (error) {
            if (error.response?.data?.errorMessage) {
                setSignupError(error.response.data.errorMessage);
            } else {
                setSignupError(t('Something went terribly wrong.'));
            }
        }
    };

    const usernameAvailable = useCallback(async (username) => {
        try {
            const response = await get(`/signup/usernameAvailable/${username}`);
            return response.available;
        } catch (error) {
            console.log(error);
            return false;
        }
    }, [get])

    useEffect(() => {
        setFocus("username");
    }, []);

    // Watch password and confirm password to validate match
    const password = watch('password');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{t('Sign Up')}</h2>
                <div className='flex items-center justify-center pb-2'>
                    <LanguageSelect />
                </div>
                {signupError && <Alert className='mt-0 mb-4 text-center' color="failure" icon={ExclamationIcon}>
                    {signupError}
                </Alert>}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username with Email Validation */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value={t('Email Address (Username)')} />
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
                                validate: AwesomeDebouncePromise(async (value) => {
                                    return await usernameAvailable(value) || t("Username is already taken.");
                                }, 500),
                            })}
                            color={errors.username ? 'failure' : 'default'}
                            helperText={errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value={t('First Name')} />
                        </div>
                        <TextInput
                            id="firstName"
                            type="text"
                            placeholder={t('First Name')}
                            {...register('firstName', { required: t('First name is required') })}
                            color={errors.firstName ? 'failure' : 'default'}
                            helperText={errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value={t('Last Name')} />
                        </div>
                        <TextInput
                            id="lastName"
                            type="text"
                            placeholder={t('Last Name')}
                            {...register('lastName', { required: t('Last name is required') })}
                            color={errors.lastName ? 'failure' : 'default'}
                            helperText={errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value={t('Password')} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: t('Password is required'),
                                minLength: {
                                    value: 8,
                                    message: t('Password must be at least 8 characters long'),
                                },
                            })}
                            color={errors.password ? 'failure' : 'default'}
                            helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="confirmPassword" value={t('Confirm Password')} />
                        </div>
                        <TextInput
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword', {
                                required: t('Please confirm your password'),
                                validate: (value) => value === password || t('Passwords do not match.'),
                            })}
                            color={errors.confirmPassword ? 'failure' : 'default'}
                            helperText={errors.confirmPassword && (
                                <span className="text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" {...register('terms', { required: t('You must accept the terms.') })} />
                        <Label htmlFor="terms" value={t('I accept the Terms and Conditions.')} />
                        {errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" color="primary" className="w-full">
                        {t('Sign Up')}
                    </Button>

                    {/* Redirect to Login */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        {t('Already have an account?')}{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            {t('Log in')};
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
