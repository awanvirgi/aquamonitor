import Clock from "@/component/clock"
import Gauge from "@/component/guage"

const Page = () => {
    return (
        <div className="pt-[70px]">
            <div className="px-6 flex">
                <Gauge data={34} max={50} ideal={[26, 32]} satuan={"°C"} nama={"Suhu"} />
                <Gauge data={7.2} max={10} ideal={[6, 8]} nama={"Kadar pH"} />
            </div>
            <div className="px-6">
                <Clock />
            </div>
            
        </div>
    )
}
export default Page