import { useScheduleProvider } from "@/context/scheduleProvider"
import { useEffect, useState } from "react"

const ModalKonfirmasi = ({ hideModal, setHideModal, action, setHide,id }) => {
    const { updateSchedule, addSchedule, deleteSchedule } = useScheduleProvider()
    const [aksi, setAksi] = useState()
    useEffect(() => {
        if (action == "add")
            return setAksi("Menambahkan")
        if (action == "edit")
            return setAksi("Merubah")
        if (action == "delete")
            return setAksi("Menghapus")
    }, [action])
    const handleConfirm = async (id) => {
        setHide(true)
        if (action == "edit") {
            await updateSchedule()
        } else if (action == "add") {
            await addSchedule()
        } else {
            await deleteSchedule(id)
        }
        return setHideModal(true);
    }
    return (
        <div className={`fixed left-0 z-50 h-screen w-screen bg-black bg-opacity-85 p-4 z-100 text-white ${hideModal ? "hidden" : "block"} px-4 `}>
            <div className="w-full max-w-[90%] lg:max-w-96 bg-white text-black text-center rounded border-2 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h4 className="text-2xl font-semibold my-10">Yakin Ingin {aksi}???</h4>
                <div className="flex justify-around gap-4 text-lg mb-2">
                    <button className="p-3 flex-1 max-w-32 bg-blue-500 rounded-md text-white" onClick={() => handleConfirm(id)} >Iya</button>
                    <button className="p-3 flex-1 max-w-32 bg-red-500 rounded-md text-white" onClick={() => setHideModal(true)}>Tidak</button>
                </div>
            </div>
        </div>
    )
}
export default ModalKonfirmasi