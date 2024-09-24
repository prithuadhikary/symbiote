import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../util/useApi';
;

const Signup = () => {

    const { post, get } = useApi();
    const navigate = useNavigate();

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
            console.log(error);
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
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Sign Up</h2>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username with Email Validation */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Email Address (Username)" />
                        </div>
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
                                validate: AwesomeDebouncePromise(async (value) => {
                                    return await usernameAvailable(value) || 'Username is already taken.';
                                }, 500),
                            })}
                            color={errors.username ? 'failure' : 'default'}
                            helperText={errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value="First Name" />
                        </div>
                        <TextInput
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            {...register('firstName', { required: 'First name is required' })}
                            color={errors.firstName ? 'failure' : 'default'}
                            helperText={errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Last Name" />
                        </div>
                        <TextInput
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            {...register('lastName', { required: 'Last name is required' })}
                            color={errors.lastName ? 'failure' : 'default'}
                            helperText={errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long',
                                },
                            })}
                            color={errors.password ? 'failure' : 'default'}
                            helperText={errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="confirmPassword" value="Confirm Password" />
                        </div>
                        <TextInput
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            color={errors.confirmPassword ? 'failure' : 'default'}
                            helperText={errors.confirmPassword && (
                                <span className="text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" {...register('terms', { required: 'You must accept the terms' })} />
                        <Label htmlFor="terms" value="I accept the Terms and Conditions" />
                        {errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" color="primary" className="w-full">
                        Sign Up
                    </Button>

                    {/* Redirect to Login */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
