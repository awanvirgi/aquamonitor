'use client'

const { fetchScheduleData, subscribeToScheduleData } = require("@/apihandler/api");
const { createContext, useState, useEffect, useContext } = require("react")

const ScheduleContext = createContext(undefined)

const ScheduleProvider = ({ children }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [editSchedule,setEditSchedule] = useState([]);
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
    useEffect(()=>{
        fetchData()
        return()=>{
            unsubscribeSchedule()
        }
    },[])
    return(
        <ScheduleContext.Provider value={{scheduleData,setScheduleData,editSchedule,setEditSchedule  }}>
            {children}
        </ScheduleContext.Provider>
    )
}
export default ScheduleProvider;
export function useScheduleProvider(){
    return useContext(ScheduleContext)
}