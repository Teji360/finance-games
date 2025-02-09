"use client"

import Image from "next/image"
import Logo from "../../public/Logo.png"

const Header = () => {
  return (
    <header className="top-0 w-full flex flex-row space-x-2 shadow-sm h-10">
        <Image src={Logo} height={300} width={300} alt="main-logo" />

        <div>

        </div>
    </header>
  )
}
export default Header