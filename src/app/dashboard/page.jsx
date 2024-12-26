'use client';

import { useEffect, useState } from 'react';
import { subscribeToSensorData, subscribeToScheduleData, fetchSensorData, fetchScheduleData } from '@/apihandler/api'; // Import API handler
import Gauge from '@/component/guage';
import Clock from '@/component/clock';
import { useSensorProvider } from '@/context/sensorProvider';
import { useScheduleProvider } from '@/context/scheduleProvider';


const Page = () => {
    const {sensorData} = useSensorProvider()
    const {scheduleData} = useScheduleProvider()

    useEffect(() => {
        console.log(sensorData)
        console.log(scheduleData)
    }, [sensorData, scheduleData])

    const { temp_data, ph_data } = sensorData.at(-1) || { temp_data: 0, ph_data: 0 }; 
    return (
        <div className="pt-[70px]">
            <div className="px-6 flex">
                <Gauge data={temp_data} max={50} ideal={[26, 32]} satuan={"°C"} nama={"Suhu"} />
                <Gauge data={ph_data} max={10} ideal={[6, 8]} nama={"Kadar pH"} />
            </div>
            <div className="px-6">
                <Clock scheduleData={scheduleData} />
            </div>
        </div>
    );
};

export default Page;
