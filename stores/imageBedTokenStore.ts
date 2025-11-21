import { isDateTimeExpired } from '@/hooks/utils';
import { imageBedRequest } from '@/utils/request';
import * as SecureStore from 'expo-secure-store';

interface ImageBedTokenResponse {
    status: boolean,
    message: string,
    data: {
        tokens: {
            token: string,
            expired_at: string
        }[]
    }
}
class ImageBedToken {
    token: string = '';
    expire: string = '';

    private constructor() { }
    static async create() {
        const instance = new ImageBedToken();
        await instance.initToken();
        return instance;
    }


    async initToken() {
        let result = await SecureStore.getItemAsync('imageBed_expire');
        let needUpdate = !result || result.trim() === '' || isDateTimeExpired(result);

        console.log('imageBed_expire at', result)
        if (needUpdate) {
            console.log('initToken refreshToken ....')
            await this.refreshToken()
        }
        return this.token
    }
    async fetchImageToken() {
        const params = {
            num: 1,
            seconds: 60 * 60 * 24 * 7
        }
        const response = await imageBedRequest.post<ImageBedTokenResponse>('/images/tokens', params);
        console.log('获取图床token:', JSON.stringify(response));
        if (!response.status) {
            console.error('获取图床token失败:', response.message);
            throw new Error(response.message);
        }

        return response.data.tokens[0];
    }

    refreshToken = async () => {
        const tokenInfo = await this.fetchImageToken()
        this.token = tokenInfo.token;
        this.expire = tokenInfo.expired_at;
        await Promise.all(
            [
                SecureStore.setItemAsync('imageBed_token', this.token),
                SecureStore.setItemAsync('imageBed_expire', this.expire)
            ]
        )

    }

    getToken = async () => {
        if (!this.expire || this.expire.trim() === ''
            || !this.token || this.token.trim() === ''
            || isDateTimeExpired(this.expire)) {
            console.log('getToken refreshToken ....')
            await this.refreshToken();
        }
        return this.token;
    }
}

let _instance: ImageBedToken | null = null;
export async function getImageBedToken(): Promise<ImageBedToken> {
    if (!_instance) {
        _instance = await ImageBedToken.create();
    }
    return _instance;
}