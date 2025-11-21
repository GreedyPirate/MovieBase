import { getImageBedToken } from "@/stores/imageBedTokenStore";
import { imageBedRequest } from "@/utils/request";
import { randomUUID } from 'expo-crypto';
// import { File } from 'expo-file-system';
import { ImagePickerSuccessResult } from 'expo-image-picker';

/**
 * 图片链接（links）的详细信息
 */
interface ImageLinks {
    /** 图片访问 url */
    url: string;
    /** 占位符或特定格式的链接 */
    html: string;
    /** BBCode 格式的链接 */
    bbcode: string;
    /** Markdown 格式的链接 */
    markdown: string;
    /** 带有链接的 Markdown 格式 */
    markdown_with_link: string;
    /** 缩略图 url */
    thumbnail_url: string;
    /** 图片删除 url */
    delete_url: string;
}

/**
 * 上传成功后返回的数据（data）结构
 */
interface UploadData {
    /** 图片唯一密钥 */
    key: string;
    /** 图片名称 */
    name: string;
    /** 图片路径名 */
    pathname: string;
    /** 图片原始名 */
    origin_name: string;
    /** 图片大小，单位 KB */
    size: number; // 使用 number 代替 Float
    /** 图片类型 */
    mimetype: string;
    /** 图片拓展名 */
    extension: string;
    /** 图片 md5 值 */
    md5: string;
    /** 图片 sha1 值 */
    sha1: string;
    /** 链接对象 */
    links: ImageLinks;
}

interface UploadResponse {
    /** 状态，true 或 false */
    status: boolean;
    /** 描述信息 */
    message: string;
    /** 数据对象 */
    data: UploadData;
}

export const uploadImage = async (picked: ImagePickerSuccessResult) => {
    // const formData = formDataFromImagePicker(picked)
    const formData = new FormData();
    // formData.append('file', new File(picked.assets[0].uri, picked.assets[0].fileName ?? randomUUID() + '.JPG'));
    formData.append('file', {
        uri: picked.assets[0].uri,
        name: picked.assets[0].fileName ?? randomUUID() + '.JPG',
        type: 'image/jpeg'
    } as any);
    const tokenStore = await getImageBedToken();
    const imageBedToken = await tokenStore.getToken()
    formData.append('token', imageBedToken);
    // formData.append('permission', '0');
    // formData.append('strategy_id', '1');
    // formData.append('album_id', '549');
    // const expiredTime = afterDaysAndFormat(30)
    // formData.append('expired_at', expiredTime);
    console.log('formData', formData)

    const result = await imageBedRequest.post<Promise<UploadResponse>>('/upload',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    if (!result.status) {
        console.error('上传图片失败:', result.message)
        throw Error(result.message);

    }
    return result.data;
};