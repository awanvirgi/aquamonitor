'use client'
import ModalKonfirmasi from "@/component/modalKonfirmation"
import TableJadwal from "@/component/tableJadwal"
import { useScheduleProvider } from "@/context/scheduleProvider"
import { useEffect, useState } from "react"

const Page = ({ jadwal, time }) => {
    const [hide, setHide] = useState(true)
    const [action, setAction] = useState("")
    const [hideModal, setHideModal] = useState(true);
    const [id,setId] = useState(null)
    const { editSchedule, setEditSchedule, inputVolume, setInputVolume, inputTime, setInputTime } = useScheduleProvider()
    useEffect(() => {
        setInputTime(editSchedule[0] || "")
        // setInputVolume(editSchedule[1] || "")
    }, [editSchedule])
    const handleTimeChange = (e) => {
        setInputTime(e.target.value);
    }
    // const handleVolumeChange = (e) => {
    //     setInputVolume(e.target.value);
    // };
    const close = () => {
        setHide(true)
        setInputTime("")
        setInputVolume("")
        setEditSchedule([])
    }
    const handleKonfirm = () =>{
        if(inputTime == "" || inputVolume == "")return alert("Masih ada Input yang Kosong")
            return setHideModal(false)
    }
    return (
        <div className="relative h-screen w-full max-w-96 ">
            <ModalKonfirmasi hideModal={hideModal} setHideModal={setHideModal} action={action} setHide={(n) => setHide(n)} id={id}/>
            <div className={`${hide ? "hidden" : "block"} shadow-lg p-6 rounded-lg mb-4  absolute w-10/12 left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2  bg-white z-40 `}>
                <div className="flex justify-between text-center text-2xl font-bold mb-4">
                    <div></div>
                    <p>Atur Jadwal</p>
                    <div className=" h-5 align-text-top flex justify-center rounded-sm hover:text-white hover:bg-red-400 leading-3 aspect-square cursor-pointer" onClick={() => close()}>x</div>
                </div>
                <label htmlFor="time" className="mb-2">
                    <p className="font-medium text-lg mb-2">Jam</p>
                    <input value={inputTime} onChange={handleTimeChange} type="time" id="waktu" name="waktu" className="mb-4 w-full border-[1px] border-slate-400 px-4 py-2 rounded-md" required/>
                </label>
                {/* <label htmlFor="volume" className="mb-2">
                    <p className="font-medium text-lg mb-2">Volume</p>
                    <select id="volume" value={inputVolume} onChange={handleVolumeChange} name="volume" className="mb-4 w-full border-[1px] font-medium border-slate-400 px-4 py-2 rounded-md">
                        <option defaultChecked value="">Masukan Volume</option>
                        <option value="Besar">Besar</option>
                        <option value="Kecil">Kecil</option>
                    </select>
                </label> */}
                <div className="flex justify-center mt-2">
                    <button className="bg-main px-6 py-2 rounded font-semibold text-white" onClick={handleKonfirm}>Konfirmasi</button>
                </div>
            </div>
            <div className="px-6 pt-24">
                <div className="w-full flex justify-between items-center">
                    <p className="text-lg font-semibold">Jadwal Pemberian Pakan</p>
                    <button className="bg-main hover:bg-red-400 p-2 rounded-md font-medium text-white" onClick={() => { setHide(false); setAction("add") }}>Tambah +</button>
                </div>
                <div className="h-1 w-full bg-black my-2 rounded-sm"></div>
                <TableJadwal setHide={(n) => setHide(n)} setAction={(n) => setAction(n) } setHideModal={(n)=>setHideModal(n)} setId={(n)=>setId(n)}/>
            </div>
        </div>
    )
}

export default Page