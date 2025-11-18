import { formatRelativeTime } from '@/hooks/utils';
import { Text } from 'react-native';

interface ReadableTimeTextProps {
    text: string
}
export default function ReadableTimeText({text} : ReadableTimeTextProps) {
    return (
        <>
            <Text className='text-light-200 text-base font-bold'>{formatRelativeTime(text)}</Text>
        </>
    );
}