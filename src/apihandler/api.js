import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzmfzmrhzhuwkiiwgnlw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const subscribeToSensorData = (callback) => {
    const changes = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'sensor',
            },
            (payload) => callback(payload)
        )
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'sensor',
            },
            (payload) => callback(payload)
        )
        .subscribe();

    return () => {
        changes.unsubscribe();
    };
};

export const subscribeToScheduleData = (callback) => {
    const changes = supabase
        .channel('schema-db-changes-schedule')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'feeder_schedule',
            },
            (payload) => callback(payload)
        )
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: 'feeder_schedule',
            },
            (payload) => callback(payload)
        )
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'feeder_schedule',
            },
            (payload) => callback(payload)
        ).subscribe();
    return () => {
        changes.unsubscribe();
    };
};

export const fetchSensorData = async () => {
    const { data: sensor, error } = await supabase
        .from('sensor')
        .select('*');
    if (error) throw error;
    return sensor;

};

export const fetchScheduleData = async () => {
    const { data: feeder_schedule, error } = await supabase
        .from('feeder_schedule')
        .select('*')
        .order('time', { ascending: true })
    if (error) throw error;
    return feeder_schedule;
};

export const insertScheduleData = async (timeData, volumeData) => {
    const { data, error } = await supabase
        .from('feeder_schedule')
        .insert([
            { time: timeData, volume: volumeData },
        ])
        .select()
    if (error) throw error;

}
export const updateScheduleData = async (timeData, volumeData, id) => {
    try {
        const { error } = await supabase
            .from('feeder_schedule')
            .update({
                time: timeData,
                volume: volumeData
            })
            .eq('id', id)
    } catch (err) {
        console.error(err)
    }
}

export const deleteScheduleData = async (id) => {
    console.log("test")
    const { error } = await supabase
        .from('feeder_schedule')
        .delete()
        .eq('id', id)
    if (error) throw error
}



