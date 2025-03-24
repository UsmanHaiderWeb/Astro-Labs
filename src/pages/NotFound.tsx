import { Button } from '@/components/ui/button';
import * as React from 'react';
import { Link } from 'react-router-dom';
import '@/App'

const NotFound = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-white/30">404</h1>
                <h2 className="text-4xl font-semibold text-white/80 mt-4">Page Not Found</h2>
                <p className="text-gray-500 mt-4 mb-8 max-w-sm">
                    Oops! The page you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    to="/"
                >
                    <Button variant="outline">
                        Go Back Home
                    </Button>
                </Link>
            </div>
        </main>
    );
};

export default React.memo(NotFound);