import { useState } from 'react';
import { 
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../lib/client/firebase';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/auth-context';

export function useAuth() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();


  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/comics'); // Redireciona após login bem-sucedido
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/comics');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    loginWithGoogle,
    loginWithGithub,
    logout,
    user
  };
}
