const Gauge = ({ data, max, ideal, satuan, nama }) => {
    const convert = parseInt((data / max * 100))
    const percentage = (data > max ? 100 : convert)
    const radius = 50;
    const circumference = 0.75 * 2 * Math.PI * radius;
    const circumference2 = 2 * Math.PI * radius;
    const offset = circumference2 - (percentage / 100) * circumference;

    const setWarning = () => {
        return data <= ideal[0] || data >= ideal[1] ? true : false
    }
    return (
        <div className={` ${setWarning() ? "bg-red-50" : "bg-slate-50"}  shadow-lg p-6 rounded-lg mb-4`}>
            <div className="flex items-center justify-center">
                <svg
                    className="flex-1 w-full"
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        transform="rotate(135 60 60)"
                        strokeWidth="8"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke={`${setWarning() ? "#ef4444" : "#60a5fa"}`}
                        strokeWidth="8"
                        strokeDasharray={circumference2}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(135 60 60)"
                        style={{
                            transition: "stroke 0.5s ease, stroke-dashoffset 0.5s ease",
                        }}
                    />
                </svg>
                <div className={`absolute z-10 text-xl font-bold ${setWarning() ? "text-[#ef4444]" : "text-main"}`}>
                    {data} {satuan}
                </div>
            </div>
            <div className="w-full">
                <h1 className={`mt-2 text-center text-lg font-bold ${setWarning() ? "text-red-500" : "text-black"} `}>{nama}</h1>
                <h3 className="text-[#ef4444] text-center mt-2 text-xs font-light">
                    {
                        (setWarning()) ? `⚠️${nama} tidak sesuai dengan idealnya` : ``
                    }
                </h3>

            </div>
        </div>
    )
}
export default Gauge