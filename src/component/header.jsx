'use client'

import { usePathname } from "next/navigation";

const Header = () =>{
    const path = usePathname()
    return(
        <header className={`${path=="/"?"hidden":"flex"} fixed top-0 z-[9999] w-screen bg-main px-6 py-4 font-bold text-xl text-white`}>AQUAMONITOR</header>
    )
}
export default Header