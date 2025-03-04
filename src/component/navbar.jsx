'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge ,faCalendar, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const path = usePathname()
    return (
        <div className={`fixed flex justify-around px-6 py-2 items-center bottom-0 bg-main w-screen h-20`}>
            <Link href={"/"} className="flex items-center gap-[4px] flex-col">
                <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faGauge} /></div>
                <h4 className="font-medium text-white">Dashboard</h4>
                <div className={`${path==="/"?"block":"hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
            <Link href={"/jadwal"} className="flex items-center gap-[4px] flex-col">
                <div className="w-6 aspect-square text-center"><FontAwesomeIcon className="text-2xl text-white" icon={faCalendar} /></div>
                <h4 className="font-medium text-white">Jadwal Pakan</h4>
                <div className={`${path==="/jadwal"?"block":"hidden"} h-1 w-full bg-white rounded-md`}></div>
            </Link>
        </div>
    )
}
export default Navbar