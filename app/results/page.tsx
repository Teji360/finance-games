'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Results = () => {
    const router = useRouter();


    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-semibold">Game Over!</h1>
            <div className="mt-4">
                <Button onClick={() => router.push('/')} className="bg-blue-500">Go Back Home</Button>
            </div>
        </div>
    );
};

export default Results;
