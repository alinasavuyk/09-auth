'use client';
import css from '@/components/SignInPage/SignInPage.module.css'
import {useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginRequest } from '@/types/user';
import { login } from '@/lib/api/clientApi';
import { ApiError } from '@/types/note';
import { useAuthStore } from '@/lib/store/authStore';
const SignInPage = () => {
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const signInId = useId();
  const router = useRouter();

  const handleLoginSubmit = async (formData: FormData) => {
    try {
      const userData: LoginRequest = {
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      };
      const user = await login(userData);
      if (user) {
        setUser(user);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };
  return (
    <main className={css.mainContent}>
      
      <form className={css.form} action={handleLoginSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor={`${signInId}-email`}>Email</label>
          <input
            id={`${signInId}-email`}
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${signInId}-password`}>Password</label>
          <input
            id={`${signInId}-password`}
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignInPage;
