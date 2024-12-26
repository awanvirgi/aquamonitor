import { faPen, faPencilRuler, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const TableJadwal = ({setHide}) => {
    return (
        <table className="table-auto w-full">
            <thead className="border-[1px] border-slate-400 bg-main text-white">
                <tr>
                    <th>Jam</th>
                    <th>Volume</th>
                    <th>aksi</th>
                </tr>
            </thead>
            <tbody className="border-[1px] border-slate-400">
                <tr>
                    <td className="p-2 text-center font-medium">18:00</td>
                    <td className="p-2 text-center font-medium">Banyak</td>
                    <td className="p-2">
                        <div className="flex gap-1 justify-center">
                            <button className="bg-red-600 aspect-square rounded p-1 w-10 text-white"><FontAwesomeIcon className="text-lg" icon={faTrash} /></button>
                            <button className="bg-blue-600 aspect-square rounded p-1 w-10 text-white" onClick={() => setHide(false)}><FontAwesomeIcon className="text-lg" icon={faPen} /></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
export default TableJadwal