import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`${VITE_API_URL}/api/auth/verify-email/${token}`);
        toast.success('Email verified successfully!');
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Verification failed');
        navigate('/register');
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return <div>Verifying your email...</div>;
}