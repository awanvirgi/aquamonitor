'use client'
import moment from "moment"
import { useEffect, useState } from "react"

const Clock = () => {
    const [time, setTime] = useState(moment().format("HH:mm"))
    moment.locale("id")
    useEffect(() => {
        setTime(moment().format("HH:mm"));
        const interval = setInterval(() => {
            setTime(moment().format("HH:mm"));
        }, 1000);

        return () => clearInterval(interval);
    }, [])
    if (!time) return null
    return (
        <div className="shadow-lg p-6 rounded-lg mb-4">
            <div>
                <div className="mb-5">
                    <h3 className="font-semibold text-center mb-2">Waktu Pemberian Pakan Selanjutnya</h3>
                    <div className="h-[2px] w-full bg-black rounded-lg"></div>
                    <div className="py-4 flex items-center justify-center">
                        <h1 className="text-5xl font-bold text-main">18:00</h1>
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <span className="font-semibold text-center mb-2">Sekarang : </span>
                    <span className="text-xl font-bold text-">{time}</span>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-main px-8 py-2 font-medium text-white rounded-lg">Atur Jadwal</button>
            </div>
        </div>
    )
}
export default Clock