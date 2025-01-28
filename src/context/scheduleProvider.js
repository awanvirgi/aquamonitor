'use client'

import moment from "moment";

const { fetchScheduleData, subscribeToScheduleData, insertScheduleData, updateScheduleData, deleteScheduleData } = require("@/apihandler/api");
const { createContext, useState, useEffect, useContext } = require("react")

const ScheduleContext = createContext(undefined)

const ScheduleProvider = ({ children }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [editSchedule, setEditSchedule] = useState([]);
    const [inputTime, setInputTime] = useState("");
    const [inputVolume, setInputVolume] = useState("");
    const fetchData = async () => {
        const initialScheduleData = await fetchScheduleData();
        setScheduleData(initialScheduleData);
    };

    const unsubscribeSchedule = subscribeToScheduleData((newScheduleData) => {
        if (newScheduleData.eventType === "UPDATE") {
            const newData = newScheduleData.new
            setScheduleData(prevData =>
                prevData.map(item =>
                    item.id === newData.id ? newData : item
                )
            );
        } else if (newScheduleData.eventType === "INSERT") {
            const newData = newScheduleData.new
            setScheduleData(prevData => [...prevData, newData]);
        }
    });
    const convertTimestampz = (timeData) => {
        const combined = `2025-01-01 ${timeData}`
        const result = moment(combined, "YYYY-MM-DD HH:mm").utc().format("YYYY-MM-DD HH:mm:ssz")
        return result
    }
    const addSchedule = async () => {
        const convertTime = convertTimestampz(inputTime)
        await insertScheduleData(convertTime, inputVolume)
        // fetchData()
        // return () => {
        //     unsubscribeSchedule();
        // }
    }
    const updateSchedule = async () => {
        const convertTime = convertTimestampz(inputTime)
        await updateScheduleData(convertTime, inputVolume, editSchedule[2])
        // fetchData()
        // return () => {
        //     unsubscribeSchedule();
        // }
    }
    const deleteSchedule = async (id) => {
        await deleteScheduleData(id)
        // fetchData()
        // return () => {
        //     unsubscribeSchedule();
        // }
    }
    useEffect(() => {
        fetchData()
        return () => {
            unsubscribeSchedule()
        }
    }, [])

    return (
        <ScheduleContext.Provider value={{
            scheduleData, setScheduleData, editSchedule, setEditSchedule,deleteSchedule,
            addSchedule, updateSchedule, inputTime, setInputTime, inputVolume, setInputVolume
        }}>
            {children}
        </ScheduleContext.Provider>
    )
}
export default ScheduleProvider;
export function useScheduleProvider() {
    return useContext(ScheduleContext)
}