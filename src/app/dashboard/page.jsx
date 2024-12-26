'use client';

import { useEffect, useState } from 'react';
import { subscribeToSensorData, subscribeToScheduleData, fetchSensorData, fetchScheduleData } from '@/apihandler/api'; // Import API handler
import Gauge from '@/component/guage';
import Clock from '@/component/clock';


const Page = () => {
    const [sensorData, setSensorData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const initialSensorData = await fetchSensorData();
            const initialScheduleData = await fetchScheduleData();
            setSensorData(initialSensorData);
            setScheduleData(initialScheduleData);
        };

        fetchData();

        const unsubscribeSensor = subscribeToSensorData((newSensorData) => {
            if (newSensorData.eventType === "UPDATE") {
                const newData = newSensorData.new
                setSensorData(prevData =>
                    prevData.map(item =>
                        item.id === newData.id ? newData : item
                    )
                );
            } else if(newSensorData.eventType === "INSERT"){
                const newData = newSensorData.new
                setSensorData(prevData =>[...prevData,newData]);
            }
        });

        const unsubscribeSchedule = subscribeToScheduleData((newScheduleData) => {
            if (newScheduleData.eventType === "UPDATE") {
                const newData = newScheduleData.new
                setScheduleData(prevData =>
                    prevData.map(item =>
                        item.id === newData.id ? newData : item
                    )
                );
            } else if(newScheduleData.eventType === "INSERT") {
                const newData = newScheduleData.new
                setScheduleData(prevData => [...prevData,newData]);
            }
        });

        return () => {
            unsubscribeSensor();
            unsubscribeSchedule();
        };
    }, []);
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
