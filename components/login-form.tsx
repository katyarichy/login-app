'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

  const onSubmit = async (data: FormData) => {
    const API_URL = '/api/auth';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { token, role } = await response.json();
      router.push('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-6 rounded shadow-md w-full max-w-md space-y-4'
    >
      <h2 className='text-2xl mb-4'>Login</h2>
      <div>
        <label htmlFor='username' className='block mb-1'>
          Username
        </label>
        <input
          id='username'
          type='text'
          {...register('username')}
          className='w-full border-2 border-gray-300 p-2 rounded'
        />
        {errors.username && (
          <p className='text-red-600'>{errors.username.message}</p>
        )}
      </div>
      <div>
        <label htmlFor='password' className='block mb-1'>
          Password
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className='w-full border-2 border-gray-300 p-2 rounded'
        />
        {errors.password && (
          <p className='text-red-600'>{errors.password.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
