import { File, Paths } from "expo-file-system";
import { ImagePickerSuccessResult } from 'expo-image-picker';

/**
 * 获取小数的整数部分和小数部分
 * @param num - 数字
 * @returns 整数部分和小数部分
 */
export function splitDecimal(num: number): { integer: number; decimal: number } {
    const integer = Math.trunc(num);      // 获取整数部分（向零取整）
    const decimal = num - integer;        // 小数部分（带符号）
    return { integer, decimal };
}

/**
 * 将 ISO 时间字符串转换为语义化相对时间（中文）
 * @param isoString - ISO 8601 时间字符串，如 '2022-12-11T06:20:22.180Z'
 * @returns 语义化时间字符串，如 '刚刚'、'5分钟前'、'1天前' 等
 */
export function formatRelativeTime(isoString: string): string {
    const now = new Date();
    const inputDate = new Date(isoString);

    // 安全检查：无效日期返回原始字符串或占位符
    if (isNaN(inputDate.getTime())) {
        return '未知时间';
    }

    const diffMs = now.getTime() - inputDate.getTime(); // 毫秒差

    // 如果是未来时间（理论上不应出现），显示“刚刚”
    if (diffMs < 0) {
        return '刚刚';
    }

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // 按优先级从高到低判断
    if (seconds < 60) {
        return '刚刚';
    } else if (minutes < 60) {
        return `${minutes}分钟前`;
    } else if (hours < 24) {
        return `${hours}小时前`;
    } else if (days < 7) {
        return `${days}天前`;
    } else if (weeks < 4) {
        return `${weeks}周前`;
    } else if (months < 12) {
        return `${months}个月前`;
    } else {
        return `${years}年前`;
    }
}

export const afterDaysAndFormat = (afterDays: number) => {
    const now = new Date();
    const future = new Date(now.getTime() + afterDays * 24 * 60 * 60 * 1000); // 加 30 天（毫秒）
    const pad = (num: number) => String(num).padStart(2, '0');
    const year = future.getFullYear();
    const month = pad(future.getMonth() + 1); // getMonth() 返回 0-11
    const day = pad(future.getDate());
    const hours = pad(future.getHours());
    const minutes = pad(future.getMinutes());
    const seconds = pad(future.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 判断给定的 "YYYY-MM-DD HH:mm:ss" 时间是否已过期（基于本地时区）
 * @param datetimeStr - 格式如 "2025-11-28 21:09:52"
 * @returns true 表示已过期，false 表示未过期
 */
export function isDateTimeExpired(datetimeStr: string): boolean {
  const isoStr = datetimeStr.replace(' ', 'T');
  const expireDate = new Date(isoStr);
  
  // 检查是否有效日期
  if (isNaN(expireDate.getTime())) {
    console.log(`Invalid date string: ${datetimeStr}`);
    return true;
  }

  return expireDate < new Date();
}



export function base64ToArrayBuffer(base64: string): Uint8Array {
  // Remove the data URL prefix if present
  if (base64.startsWith("data:")) {
    base64 = base64.split(",")[1];
  }

  // Decode the Base64 string into a binary string
  const binaryString = atob(base64);

  // Create a new ArrayBuffer with the same length as the binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));

  // Populate the Uint8Array with the character codes from the binary string
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}
export function base64ToFile(base64: string, filename?: string | null): File {
  if (!filename) {
    // Attempt to guess the mime type from the base64 string
    const match = base64.match(/^data:(image\/[a-zA-Z]+);base64,/);
    const ext = match ? match[1].split("/")[1] : "jpg";
    filename = `generated-${Date.now()}.${ext}`;
  }
  const file = new File(Paths.cache, filename);
  file.create({ overwrite: true });
  file.write(base64ToArrayBuffer(base64));
  return file;
}

export function formDataFromImagePicker(result: ImagePickerSuccessResult) {
  const formData = new FormData();

  for (const index in result.assets) {
    const asset = result.assets[index];

    if (asset.base64) {
      formData.append(
        `photo.${index}`,
        // Avoid using base64, but some APIs only return base64 so we support it.
        base64ToFile(asset.base64, asset.fileName)
      );
    } else {
      formData.append(
        `photo.${index}`,
        // asset.file is returned on web only as of SDK 54.
        asset.file ??
          // We can create a File from the URI on native.
          new File(asset.uri)
      );
    }

    if (asset.exif) {
      formData.append(`exif.${index}`, JSON.stringify(asset.exif));
    }
  }

  return formData;
}

export function formatMinutes(totalMinutes: number) {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h${minutes}m`;
  }
}