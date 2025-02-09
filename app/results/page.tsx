'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Logo from "../../public/Congratulations.png"
import Image from 'next/image';



const Results = () => {
    const router = useRouter();


    return (
        <div className="h-full flex flex-col items-center p-8">
            <Image src={Logo} height={200} width={400} alt="Congrats!" />
            <div className="mt-4">
                <Button onClick={() => router.push('/')} className="bg-yellow-500">Go Back Home</Button>
            </div>
        </div>
    );
};

export default Results;
