import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Image, Platform, TextInput, View } from 'react-native';
export default function SearchBar() {
    const router = useRouter();
    return (
        <View>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            {/* KeyboardAvoidingView:  behavior="position" keyboardVerticalOffset={30} */}
            <View className='flex-row items-center bg-dark-200 rounded-2xl px-4 px-4 py-3'> 
                {/* <Image source={icons.search} className='w-5 h-5' resizeMode='contain' tintColor="#AB8BFF"></Image> */}
                <Search size={20} color="#AB8BFF" />
                <TextInput className='flex-1 ml-2 text-white text-base' 
                    style={{
                        minHeight: 0,           // 重置 Android 最小高度
                        paddingTop: 0,     // 移除内部 padding
                        includeFontPadding: false, // Android 去掉字体额外 padding
                        textAlignVertical: 'center',  // Android 文字垂直居中（默认靠上）
                        paddingBottom: Platform.OS === 'ios' ? 4 : 0,
                    }}
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