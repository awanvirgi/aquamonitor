'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge ,faCalendar, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const path = usePathname()
    return (
        <div className={`${path == "/" ? "hidden" : "block"} fixed flex justify-between px-6 py-2 items-center bottom-0 bg-main w-screen h-20`}>
            <Link href={"/dashboard"} className="flex items-center gap-[4px] flex-col">
                <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faGauge} /></div>
                <h4 className="font-medium text-white">Dashboard</h4>
                <div className={`${path==="/dashboard"?"block":"hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
            <Link href={"/jadwal"} className="flex items-center gap-[4px] flex-col">
                <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faCalendar} /></div>
                <h4 className="font-medium text-white">Jadwal Pakan</h4>
                <div className={`${path==="/jadwal"?"block":"hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
            <Link href={"/"} className="flex items-center gap-[4px] flex-col">
                <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faArrowRightFromBracket} /></div>
                <h4 className="font-medium text-white">Log out</h4>
            </Link>
        </div>
    )
}
export default Navbar