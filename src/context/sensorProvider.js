'use client'

const { subscribeToSensorData, fetchSensorData } = require("@/apihandler/api")
const { createContext, useState, useContext, useEffect } = require("react")
const SensorContext = createContext(undefined)

const SensorProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState([])

    const fetchData = async () => {
        const initialSensorData = await fetchSensorData();
        setSensorData(initialSensorData);
    };

    const unsubscribeSensor = subscribeToSensorData((newSensorData) => {
        if (newSensorData.eventType === "UPDATE") {
            const newData = newSensorData.new
            setSensorData(prevData =>
                prevData.map(item =>
                    item.id === newData.id ? newData : item
                )
            );
        } else if (newSensorData.eventType === "INSERT") {
            const newData = newSensorData.new
            setSensorData(prevData => [...prevData, newData]);
        }
    });

    useEffect(() => {
        fetchData();
        return () => {
            unsubscribeSensor();
        };
    }, []);
    return (
        <SensorContext.Provider value = {{sensorData,setSensorData}}>
            {children}
        </SensorContext.Provider>
    )
}

export default SensorProvider;
export function useSensorProvider(){
    return useContext(SensorContext)
}