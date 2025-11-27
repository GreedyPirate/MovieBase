import SearchHistory from '@/components/SearchHistory';
import SearchResult from '@/components/SearchResult';
import { images } from '@/constants/images';
import { searchMovie } from '@/hooks/useMovie';
import { MovieList } from '@/interfaces/interfaces';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchPage() {
    const insets = useSafeAreaInsets();
    const nav = useNavigation();
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [value, setValue] = useState('');
    const [query, setQuery] = useState('');
    const inputDom = useRef<TextInput>(null);

    useEffect(() => {
        const timeoutID = setTimeout(async () => {
            console.log('开始搜索:', query);
            if (!query) {
                setMovieList([]);
                return
            }
            
            const movieData = await searchMovie(query)
            setMovieList(movieData.results);
        }, 500);
        return () => clearTimeout(timeoutID);
    }, [query])
    
    return (
        <SafeAreaProvider>
            <View className='flex-1 bg-primary' style={{ paddingTop: insets.top }}>
                <Image source={images.bg} className='absolute size-full'></Image>
                <View className='flex-1'>
                    <View className='w-full flex-row item-center px-5 py-4'>
                        <Pressable className="flex-row items-center" onPress={() => { nav.goBack() }}>
                            <Ionicons name="chevron-back" size={20} color="white" />
                            <Text className="text-white text-base ml-1">返回</Text>
                        </Pressable>
                        {/* KeyboardAvoidingView:  behavior="position" keyboardVerticalOffset={30} */}
                        <View className='flex-row flex-1 items-center justify-center bg-dark-200 rounded-2xl ml-3 px-4 py-3'>
                            <Search size={20} color="#AB8BFF" />
                            <TextInput className='flex-1 ml-2 text-white text-base' 
                                style={{
                                    minHeight: 0,           // 重置 Android 最小高度
                                    paddingTop: 0,     // 移除内部 padding
                                    includeFontPadding: false, // Android 去掉字体额外 padding
                                    textAlignVertical: 'center',  // Android 文字垂直居中（默认靠上）
                                    paddingBottom: Platform.OS === 'ios' ? 4 : 0,
                                }}
                                autoFocus={true}
                                value={value}
                                ref={inputDom}
                                onSubmitEditing={()=>{inputDom.current?.blur()}}
                                onChangeText={(text)=> {
                                    setValue(text);
                                    setQuery(text.trim());
                                }}
                                placeholder='请输入关键字' placeholderTextColor="#A8B5DB" enterKeyHint="search" />
                        </View>
                    </View>

                    {
                        query ? 
                        (
                            <SearchResult data={movieList.slice(0,10)} query={query}/>
                        ) : 
                        (
                            <SearchHistory/>
                        )
                    }
                    
                </View>
            </View>

        </SafeAreaProvider>
    );
}