'use client';

import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const Clock = ({ scheduleData }) => {
    const [time, setTime] = useState(moment().format("HH:mm"));
    const [nearestSchedule, setNearestSchedule] = useState(null);

    moment.locale("id");

    useEffect(() => {
        // Update waktu sekarang setiap detik
        const interval = setInterval(() => {
            setTime(moment().format("HH:mm"));
        }, 1000);

        // Cari jadwal terdekat setiap kali waktu diperbarui
        const nearest = getNearestSchedule(scheduleData);
        setNearestSchedule(nearest);

        return () => clearInterval(interval);
    }, [scheduleData]);

    const getNearestSchedule = (data) => {
        if (!data || data.length === 0) return null;

        const now = moment();
        let closest = null;
        let minDifference = Infinity;

        data.forEach((item) => {
            const itemTime = moment.utc(item.time).local().format("HH:mm")
            const diff = moment(itemTime, "HH:mm").diff(now, 'minutes')

            if (diff >= 0 && diff < minDifference) {
                minDifference = diff;
                closest = item;
            }
        });

        return closest;
    };

    if (!time) return null;

    return (
        <div className="shadow-lg p-6 rounded-lg mb-4 w-full">
            <div>
                <div className="">
                    <h3 className="font-semibold text-center mb-2">Waktu Pemberian Pakan Selanjutnya</h3>
                    <div className="h-[2px] w-full bg-black rounded-lg"></div>
                    <div className="py-6 flex items-center justify-center">
                        <h1 className={` font-bold text-main ${nearestSchedule ? "text-5xl" : "text-xl"}`}>
                            {nearestSchedule ? moment(nearestSchedule.time).format("HH:mm") : "Tidak ada Jadwal"}
                        </h1>
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <span className="font-semibold">Sekarang : </span>
                    <span className="text-xl font-bold">{time}</span>
                </div>
            </div>
            <div className="flex justify-center">
                <Link href={"/jadwal"}>
                    <button className="bg-main px-8 py-2 font-medium text-white rounded-lg">Atur Jadwal</button>
                </Link>
            </div>
        </div>
    );
};

export default Clock;
