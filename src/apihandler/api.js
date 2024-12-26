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
                event: 'INSERT',
                schema: 'public',
                table: 'feeder_schedule',
            },
            (payload) => callback(payload)
        )
        .subscribe();

    return () => {
        changes.unsubscribe();
    };
};

export const fetchSensorData = async () => {
    try {
        const { data: sensor, error } = await supabase
            .from('sensor')
            .select('*');
        if (error) throw error;
        return sensor;
    } catch (err) {
        console.error(err);
    }
};

export const fetchScheduleData = async () => {
    try {
        const { data: feeder_schedule, error } = await supabase
            .from('feeder_schedule')
            .select('*');
        if (error) throw error;
        return feeder_schedule;
    } catch (err) {
        console.error(err);
    }
};



