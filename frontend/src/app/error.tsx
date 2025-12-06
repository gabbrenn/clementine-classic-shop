'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h2 className="text-4xl font-serif text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground">We apologize for the inconvenience.</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
