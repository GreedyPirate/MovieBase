import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
export default function CommentFooter()   {
    const [review, setReviews] = useState<string>('')
    return (
        <View className='bg-dark-180 absolute bottom-0 left-0 right-0 py-10 flex-row justify-center item-center gap-x-8 px-7 pt-3 '>
            <TextInput className='flex-1 pt-1 pb-3 pl-5 text-white text-base rounded-3xl bg-dark-150'
                autoFocus={false}
                value={review}
                onChangeText={(text)=>setReviews(text)}
                placeholder='分享我的看法' placeholderTextColor="#A8B5DB" enterKeyHint="search" />
            <Pressable className='self-center' onPress={()=>{}}> 
                <FontAwesome name="send" size={24} color="#FFF" />
            </Pressable>    
        </View>
    );
}