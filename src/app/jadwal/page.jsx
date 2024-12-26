'use client'
import TableJadwal from "@/component/tableJadwal"
import { useEffect, useState } from "react"

const Page = () => {
    const [hide, setHide] = useState(true)
    useEffect(() => {
    }, [hide])

    return (
        <div className="relative h-screen pt-16">
            <div className={`${hide ? "hidden" : "block"} shadow-lg p-6 rounded-lg mb-4 absolute w-10/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-white`}>
                <div className="flex justify-between text-center text-2xl font-bold mb-4">
                    <div></div>
                    <p>Atur Jadwal</p>
                    <div className="h-4 aspect-square" onClick={() => setHide(true)}>x</div>
                </div>
                <label htmlFor="time" className="mb-2">
                    <p className="font-medium text-lg mb-2">Jam</p>
                    <input type="time" id="waktu" name="waktu" className="mb-4 w-full border-[1px] border-slate-400 px-4 py-2 rounded-md" />
                </label>
                <label htmlFor="volume" className="mb-2">
                    <p className="font-medium text-lg mb-2">Jam</p>
                    <select id="volume" name="volume" className="mb-4 w-full border-[1px] font-medium border-slate-400 px-4 py-2 rounded-md">
                        <option value="">Besar</option>
                        <option value="">Kecil</option>
                    </select>
                </label>
                <div className="flex justify-center mt-2">
                    <button className="bg-main px-6 py-2 rounded text-white">Konfirmasi</button>
                </div>
            </div>
            <div className="p-6">
                <div className="w-full flex justify-between items-center">
                    <p className="text-lg font-semibold">Jadwal Pemberian Pakan</p>
                    <button className="bg-main hover:bg-red-400 p-2 rounded-md font-medium text-white" onClick={() => setHide(false)}>Tambah +</button>
                </div>
                <div className="h-1 w-full bg-black my-2 rounded-sm"></div>
                <TableJadwal setHide={(n) => setHide(n)} />
            </div>
        </div>
    )
}
export default Page