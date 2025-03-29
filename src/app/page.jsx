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



    const { temp_data, ph_data } = sensorData.at(-1) || { temp_data: 0, ph_data: 0 }; 
    return (
        <div className="pt-[70px] w-fit flex-col">
            <div className="px-6 flex-1 flex  w-fit">
                <Gauge data={temp_data.toFixed(1)} max={50} ideal={[26, 32]} satuan={"°C"} nama={"Suhu"} />
                <Gauge data={ph_data} max={14} ideal={[6, 9]} nama={"Kadar pH"} />
            </div>
            <div className="px-6 flex-1 ">
                <Clock scheduleData={scheduleData} />
            </div>
        </div>
    );
};

export default Page;
