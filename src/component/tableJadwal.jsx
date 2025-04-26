import { useScheduleProvider } from "@/context/scheduleProvider"
import { faPen, faPencilRuler, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"

const TableJadwal = ({ setHide,setAction,setHideModal,setId }) => {
    const { scheduleData,setEditSchedule,deleteSchedule } = useScheduleProvider()
    const editData = (data) =>{
        setHide(false)
        setAction("edit")
        setEditSchedule(data)
    }
    const deleteData = (id) =>{
        setAction("delete")
        setHideModal(false)
        setId(id)
    }
    return (
        <table className="table-auto w-full">
            <thead className="border-[1px] border-slate-400 bg-main text-white">
                <tr>
                    <th>Jam</th>
                    {/* <th>Volume</th> */}
                    <th>aksi</th>
                </tr>
            </thead>
            <tbody className="border-[1px] border-slate-400">
                {
                    scheduleData.map((item) => (
                        <tr key={item.id}>
                            <td className="p-2 text-center font-medium">{moment(item.time).format("HH:mm")}</td>
                            {/* <td className="p-2 text-center font-medium">{item.volume}</td> */}
                            <td className="p-2">
                                <div className="flex gap-1 justify-center">
                                    <button className="bg-red-600 aspect-square rounded p-1 w-10 text-white" onClick={()=>deleteData(item.id)}><FontAwesomeIcon className="text-lg" icon={faTrash} /></button>
                                    <button className="bg-blue-600 aspect-square rounded p-1 w-10 text-white" onClick={() => editData([moment(item.time).format("HH:mm"),item.volume,item.id])}><FontAwesomeIcon className="text-lg" icon={faPen} /></button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
export default TableJadwal