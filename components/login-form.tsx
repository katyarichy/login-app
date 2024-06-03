'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { FormControl } from '@/components/form-control';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const API_URL = '/api/auth';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { token, role } = await response.json();
      document.cookie = `token=${token}; path=/`;
      document.cookie = `role=${role}; path=/`;
      router.push('/dashboard');
    } else {
      const responseData = await response.json();
      setError(responseData.message || 'Invalid username or password');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6'
    >
      <h2 className='text-3xl font-semibold text-center mb-6'>Login</h2>

      <FormControl error={errors.username?.message}>
        <Label htmlFor='username' className='block mb-2'>
          Username
        </Label>
        <Input
          id='username'
          type='text'
          {...register('username')}
          className='focus:ring-blue-500 focus:border-blue-500'
        />
      </FormControl>

      <FormControl error={errors.password?.message}>
        <Label htmlFor='password' className='block mb-2'>
          Password
        </Label>
        <Input
          id='password'
          type='password'
          {...register('password')}
          className='focus:ring-blue-500 focus:border-blue-500'
        />
      </FormControl>

      {error && <p className='text-red-600 text-center'>{error}</p>}

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
