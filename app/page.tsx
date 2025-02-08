import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../public/Logo.png"
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image src={Logo} height={200} width={400} alt="" />
      <h1 className="text-2xl font-sans font-semibold">Welcome To Finance Games!</h1>
      <Link href = "/difficulty">
        <Button>
          SinglePlayer
        </Button>
      </Link>
    </div>
  );
}
