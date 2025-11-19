import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { EnterKeyHintType, Pressable, TextInput, View } from 'react-native';

export interface CommentFooterProps {
    keyHint?: EnterKeyHintType   
}
export default function CommentFooter({keyHint='search'}: CommentFooterProps)   {
    const [review, setReviews] = useState<string>('')
    return (
        <View className='bg-dark-180  py-10 flex-row justify-center item-center gap-x-8 px-7 pt-3 '>
            <TextInput className='flex-1 pt-1 pb-3 pl-5 text-white text-base rounded-3xl bg-dark-150'
                autoFocus={false}
                value={review}
                onChangeText={(text)=>setReviews(text)}
                placeholder='分享我的看法' placeholderTextColor="#A8B5DB" enterKeyHint={keyHint} />
            <Pressable className='self-center' onPress={()=>{}}> 
                <FontAwesome name="send" size={24} color="#FFF" />
            </Pressable>    
        </View>
    );
}