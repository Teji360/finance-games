'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../public/Logo.png"
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Home() {

  const showToast = () => {
    toast.error("Feature not yet supported!");
  }

  return (
    <div className="h-full grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
             
      <Image src={Logo} height={200} width={400} alt="" />

      <div>
        <h1 className="text-2xl font-sans font-semibold">Welcome To Finance Games!</h1>
        <h3 className="font-sans">Guess company stock and notable investors!</h3>
      </div>
      
      <div className="flex space-x-4">
        <Link href = "/difficulty">
          <Button>
            SinglePlayer
          </Button>
        </Link>  

        <Button className="bg-red-500" onClick={showToast}>
            Multi-Player
        </Button>
      </div>
      
    </div>
  );
}
