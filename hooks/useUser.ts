import { Database } from '@/database.types';
import { superbase } from '@/utils/superbaseClient';

type UserInsert = Database['public']['Tables']['user']['Insert']
type UserUpdate = Database['public']['Tables']['user']['Update']
type User = Database['public']['Tables']['user']['Row'];
export const register = async (payload: UserInsert) => {
    const { data, error } = await superbase
        .from('user')
        .insert([payload])
        .select()
        .maybeSingle();
    if(error) {
        console.error('注册失败:', error);
        throw error;
    }
    return data;
};

export const selectUser = async ({username, password} : {username: string, password: string}) => { 
    const { data, error } = await superbase
        .from('user')
        .select("id, username, email, avatar")
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();
    if(error) {
        console.error('登录失败:', error);
        throw error;
    }
    return data as User | null;
};

export const uploadAvatar = async (update: UserUpdate) => {
    const { data, error } = await superbase
        .from('user')
        .update({ avatar: update.avatar })
        .eq('user_id', update.user_id)
        .select()
        .maybeSingle();
    if(error) {
        console.error('上传头像失败:', error);
        throw error;
    }
    return data;
}