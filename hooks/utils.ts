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