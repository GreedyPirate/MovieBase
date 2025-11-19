import { images } from '@/constants/images';
import { MovieList } from '@/interfaces/interfaces';
import { movieGenresStore } from '@/stores/movieGenresStore';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface ResultListProps {
    data: MovieList,
    query: string
}

const ResultList = observer(({ data, query }: ResultListProps) => {
    // This is Iron man moon，关键字为on，返回This is Ir, on, man mo, on
    const splitByKeyword = (text:string, keyword:string) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      return text.split(regex).filter(part => part !== '');
    }
    const renderHighlightedText = (title: string, query: string) => {
      const parts = splitByKeyword(title, query);
      return parts.map((part, index) => (
        <Text key={index} className={part?.toLowerCase() === query?.toLowerCase() ? 'text-amber-500 text-lg font-medium' : 'text-white text-lg font-medium'}>
          {part}
        </Text>
      ));
    };
    const listGenres = (ids: number[]) => {
        return ids.map((id) => (
            <Text className="text-slate-300 text-xs">{movieGenresStore.getGenreName(id)}</Text>
        )) 
    }
    const router = useRouter();
    const handlePress = (id: number) => {
        // 跳转到详情页面
        router.push({
            pathname: '/pages/moveDetail',
            params: { id: id },
        });
    }
    return (
        <View className='px-5'>
            <FlatList
                data={data}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item.id)} activeOpacity={0.5}>
                        <View className="h-[80] flex-row items-center jsustify-flex-start py-2 border-b-[1px] border-dark-200">
                            <Image source={item.poster_path ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`} : images.blankMoviePic}
                                className="w-[40] h-[50] rounded-lg"
                                resizeMode="cover" />
                            <View className='flex-column gap-2 justify-between ml-3'>
                                <View className='flex-row'>
                                    {renderHighlightedText(item.title, query)}
                                </View>
                                <View className='flex-row'>
                                    {
                                        item.release_date && 
                                        (
                                            <Text className="text-slate-300 text-xs">{item.release_date}</Text>
                                        )
                                    }
                                    {
                                        item.genre_ids && item.genre_ids.length > 0 && item.release_date &&
                                        (
                                            <Text className="text-slate-300 text-xs mx-1">·</Text>
                                        ) 
                                    }
                                    {listGenres(item.genre_ids)}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    );
})
export default ResultList