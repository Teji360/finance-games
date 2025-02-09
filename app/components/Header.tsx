"use client"

import Image from "next/image"
import Logo from "../../public/Logo.png"
import Link from "next/link"

const Header = () => {
  return (
    <header className="top-0 w-full flex flex-row space-x-2 shadow-sm h-10">
        <Link href="/">
            <Image src={Logo} height={300} width={300} alt="main-logo" />
        </Link>
    </header>
  )
}
export default Header