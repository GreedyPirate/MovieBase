import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';
import { Image, TextInput, View } from 'react-native';
export default function Search() {
    const router = useRouter();
    return (
        <View>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            {/* KeyboardAvoidingView:  behavior="position" keyboardVerticalOffset={30} */}
            <View className='flex-row items-center bg-dark-200 rounded-2xl px-4 py-4'> 
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' tintColor="#AB8BFF"></Image>
                <TextInput className='flex-1 ml-2 mb-2 text-white text-base' 
                onPressOut={() => {
                    router.push({
                        pathname: '/pages/search',
                    });
                }}
                autoFocus={false}
                placeholder='请输入关键字' placeholderTextColor="#A8B5DB" enterKeyHint="search"/>
            </View> 
        </View>
        
        
    );
}