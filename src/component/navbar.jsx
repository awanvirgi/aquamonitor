'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faCalendar, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const path = usePathname()
    return (
        <div className={`fixed flex justify-around px-6 py-2 items-center bottom-0 bg-main w-screen h-20 lg:h-auto`}>
            <Link href={"/"} className="flex items-center gap-[4px] flex-col p-4">
                <div className="flex flex-col items-center gap-3 lg:flex-row">
                    <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faGauge} /></div>
                    <h4 className="font-medium text-white lg:text-2xl">Dashboard</h4>
                </div>
                <div className={`${path === "/" ? "block" : "hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
            <Link href={"/jadwal"} className="flex items-center gap-[4px] flex-col p-4">
                <div className="flex flex-col items-center gap-3 lg:flex-row">
                    <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faCalendar} /></div>
                    <h4 className="font-medium text-white lg:text-2xl">Jadwal Pakan</h4>
                </div>
                <div className={`${path === "/jadwal" ? "block" : "hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
        </div>
    )
}
export default Navbar