import { useState } from 'react';
import { Pressable, Text, TextLayoutEvent, View } from 'react-native';

export interface ExpandableTextProps {
    text: string;
    maxLines?: number;
}
export default function ExpandableText({text, maxLines = 3}: ExpandableTextProps) {
    const [contentLines, setContentLines] = useState(3);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleLayout = (e:TextLayoutEvent) => {
        console.log('lines', e.nativeEvent.lines.length);
        setContentLines(e.nativeEvent.lines.length);
    };
    return (
        <View>
            <Text className='text-white text-base mb-1' 
                onTextLayout={handleLayout} 
                numberOfLines={isExpanded ? 0 : maxLines} 
                ellipsizeMode="tail">{text}</Text>
            {
                contentLines >= maxLines && (
                    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                        <Text className='text-light-200 text-sm'>{isExpanded ? '收起' : '展开'}</Text>
                    </Pressable>
                ) 
            }
        </View>
    );
}