import { fetchSimilarMovies } from '@/hooks/useMovie';
import { MovieDetail, MovieList, ProductCompany } from '@/interfaces/interfaces';
import { movieGenresStore } from '@/stores/movieGenresStore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ExpandableText from '../ExpandableText';
import MovieCard from '../MovieCard';
import RatingStar from '../RatingStar';

interface MovieSummaryProps {
    detail?: MovieDetail,
    onScrollTop: () => void
}
export default function MovieSummary({ detail, onScrollTop}: MovieSummaryProps) {
    const [loading, setLoading] = useState(true);
    const companies = (companies: ProductCompany[]) => {
        return (
            <>
                {companies.map((company) => (
                    <Text key={company.id} className='text-light-200 text-sm'>
                        {company.name}
                    </Text>
                ))}
            </>
        );
    };
    useEffect(() => {
        if (detail) {
            setLoading(false);
        }
    }, [detail])

    const [similarMovies, setSimilarMovies] = useState<MovieList>([]);
    useEffect(() => {
        // 必须判断，detail是父组件useEffect异步加载的
        if (!detail?.id) {
            console.log('No movie detail id provided.');
            return;
        }
        const loadSimilarMovies = async () => {
            const response = await fetchSimilarMovies(detail?.id);
            setSimilarMovies(response.results);
        };
        loadSimilarMovies();
    }, [])
    const triggerScrollToTop = (event: NativeSyntheticEvent<NativeScrollEvent>) => { 
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY <= 0) {
            onScrollTop();
        }
    };


    return (
        <View className='flex-1'>
            {
                loading ? 
                (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                ) :
                (
                    <View className='px-5 mt-5 gap-y-2'>
                        <ScrollView onScroll={triggerScrollToTop}>
                            <Text className='text-white text-xl font-bold'>{detail?.title}</Text>
                            <View className='flex-row gap-x-2'>
                                <Text className='text-light-200 text-sm'>{detail?.release_date?.split('-')[0]}</Text>
                                <Text className='text-light-200 text-sm'>{detail?.runtime}m</Text>
                                {
                                    detail?.genres?.map((genre, index) => (
                                        <Text className='text-light-200 text-sm' key={genre.id}>{movieGenresStore.getGenreName(genre.id) + (index===detail?.genres?.length-1 ? '' : ' /')}</Text>
                                    ))
                                }
                            </View>


                            {/* react native flex默认是垂直布局，alignItems默认是stretch会让子元素默认按水平方向获得 100%宽度，
                                    注：flex:1也是获得100%宽度，按交叉轴获取剩余长度
                                    如果修改了父元素alignItems就不能左对齐布局，因此让子元素宽度由内容撑开，单独设置self-start */}
                            <RatingStar vote_average={detail?.vote_average ?? 0} vote_count={detail?.vote_count ?? 0} />

                            <View className='gap-y-1 mt-2 mb-5'>
                                <Text className='text-light-200 text-sm font-bold'>出品方</Text>
                                <View className='flex-row gap-x-2'>
                                    {companies(detail?.production_companies ?? [])}
                                </View>
                            </View>

                            <View className='gap-y-2'>
                                <Text className='text-light-200 text-sm'>Overview</Text>
                                <ExpandableText text={detail?.overview ?? ''} maxLines={3} />
                            </View>

                            {
                                similarMovies && similarMovies.length > 0 && (
                                    <View className='mt-3 gap-y-2'>
                                        <Text className='text-white text-lg'>猜你喜欢</Text>
                                        <FlatList
                                            horizontal
                                            data={similarMovies}
                                            contentContainerStyle={{
                                                gap: 15
                                            }}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={({ item, index }) => (
                                                <MovieCard {...{ ...item, isVertical: false }} />
                                            )}
                                        />
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
}