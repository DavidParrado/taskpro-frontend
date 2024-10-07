'use client';

import { useEffect, useState } from 'react';
import { getDecodedToken } from "@/utils/authHelpers";
import { useRouter } from "next/navigation";
import Spinner from '@/components/ui/Spinner';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Track auth state
  const router = useRouter();

  useEffect(() => {
    const decoded = getDecodedToken();

    if (!decoded) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
    router.push('/')
  }, [router]);

  if (!isAuthenticated && isLoading) {
    // While we're checking the authentication state, you could return a loading spinner or nothing
    return (
      <div className='flex w-screen h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return !isAuthenticated ? <div className='min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5'>{children}</div> : null;
}
