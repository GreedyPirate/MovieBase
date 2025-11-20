import { Database } from '@/database.types';
import { superbase } from '@/utils/superbaseClient';

type UserInsert = Database['public']['Tables']['user']['Insert']
export const register = async (payload: UserInsert) => {
    const { data, error } = await superbase
        .from('user')
        .insert([payload])
        .select()
        .maybeSingle();
    return { data, error };
};