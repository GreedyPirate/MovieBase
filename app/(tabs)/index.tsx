import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { images } from '@/constants/images';
import { fetchMovieDetail, getTopMovies, getTrendingMovie, recordMovieView } from '@/hooks/useMovie';
import { MovieDetail, MovieList } from '@/interfaces/interfaces';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
    ICarouselInstance,
    Pagination
} from "react-native-reanimated-carousel";
export default function Index() {
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);
    const movieListRef = useRef<FlatList>(null);
    const router = useRouter();

    // 下拉刷新
    const [refreshing, setRefreshing] = useState(false);
    const pullRefresh = async () => {
        setRefreshing(true);
        try {
            await loadMovieList(1, false);
            setPage(1);
        } catch (error) {
            console.error('刷新失败:', error);
        } finally {
            setRefreshing(false);
        }
    };

    // 上拉加载更多
    const [loadingMore, setLoadingMore] = useState(false);
    const loadMore = async () => {
        if (loadingMore) return;

        setLoadingMore(true);
        const nextPage = page + 1;

        // set函数只根据输入计算输出，不修改外部状态、不发起网络请求、不调用 API
        // setPage((prev) => {
        //     loadMovieList(prev, false); 
        //     return prev + 1;
        // })

        try {
            await loadMovieList(nextPage, false);
            setPage(nextPage); // 更新页码
        } catch (error) {
            console.error('加载更多失败:', error);
        } finally {
            setLoadingMore(false);
        }
    };
    // 根据page获取列表，刷新FlatList
    const loadMovieList = async (page: number = 1, loading: boolean) => {
        try {
            setLoading(loading);
            setHasError(false);
            const movieData = await getTopMovies(page);
            if (page === 1) {
                setMovieList(movieData.results);
            } else {
                setMovieList(prev => [...prev, ...movieData.results])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const [trendMovies, setTrendMovies] = useState<MovieDetail[]>([]);
    useEffect(() => {
        loadMovieList(1, true);
        const fetchTrendingMovies = async () => {
            try {
                const trendMovieIds = await getTrendingMovie();
                if (!trendMovieIds || trendMovieIds.length === 0) {
                    setTrendMovies([]);
                    return;
                }
                const moviePromises = trendMovieIds.map(id => fetchMovieDetail(id));
                const movies = await Promise.all(moviePromises);

                const validMovies = movies.filter(movie => movie !== null && movie !== undefined);

                setTrendMovies(validMovies);
            } catch (error) {
                console.error('Failed to fetch trending movies:', error);
                setTrendMovies([]);
            }
        };

        fetchTrendingMovies();
    }, []);

    const refCarousel = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const screenWidth = Dimensions.get('window').width;

    const forwardDetail = (id: number) => {
        // 跳转到电影详情页
        router.push({
            pathname: '/pages/moveDetail',
            params: { id: id },
        });
        recordMovieView(id)
    }

    return (
        <View className='flex-1 bg-primary'>
            {/* 背景图 */}
            <Image source={images.bg} className='absolute size-full'></Image>
            {
                hasError && (
                    <View className="flex-1 items-center justify-center p-5">
                        <Text className="text-white text-center">
                            加载失败，请检查网络后重试...
                        </Text>
                    </View>
                )
            }
            <View className='flex-1 px-5'>
                <SearchBar />
                {
                    loading ? (
                        <View className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/*
                                为什么要单独写在一个view里而不在ScrollView里？
                                ScrollView的本质是一个高度不固定的容器，因为滚动的特性，可以容纳无限高度的子元素
                                ActivityIndicator无法撑满ScrollView的剩余空间(除非显式设置contentContainerStyle)，也就不好垂直居中
                                absolute inset-0：脱离文档流，inset-0让view上下左右距离父元素0px，也就是撑满父元素，等效于宽高100%
                            */}
                            <ActivityIndicator size="large" color="#FFFFFF" />
                        </View>
                    ) :
                        (
                            <FlatList
                                ref={movieListRef}
                                ListHeaderComponent={() => (
                                    <View>
                                        <View className='mb-5 flex-1 bg-primary min-h-200'>
                                            {
                                                trendMovies.length > 0 && (
                                                    <View>
                                                        <Carousel
                                                            ref={refCarousel}
                                                            width={screenWidth}
                                                            height={200}
                                                            data={trendMovies}
                                                            onProgressChange={progress}
                                                            pagingEnabled={true}
                                                            autoPlay={true}
                                                            autoPlayInterval={5000}
                                                            // withAnimation={{
                                                            //     type: "spring",
                                                            //     config: {
                                                            //         damping: 20,
                                                            //         mass: 0.5,
                                                            //     }
                                                            // }}
                                                            renderItem={({ item, index }) => (
                                                                <TouchableOpacity
                                                                    onPress={() => forwardDetail(item.id)}
                                                                    className="flex-1 items-start justify-center aspect-16/9 rounded-lg overflow-hidden">
                                                                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
                                                                        className='size-full'
                                                                        resizeMode="cover"
                                                                    />
                                                                </TouchableOpacity>
                                                            )}
                                                        />
                                                        <Pagination.Basic
                                                            progress={progress}
                                                            data={trendMovies}
                                                            activeDotStyle={{ backgroundColor: "#FFE400", borderRadius: 50 }}
                                                            dotStyle={{ width:6, height:6, backgroundColor: "#FFF", borderRadius: 50 }}
                                                            containerStyle={{
                                                                position: 'absolute',
                                                                bottom: 10,
                                                                gap: 5
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            }
                                        </View>
                                        <View className="mb-4 px-2">
                                            <Text className="text-white">最新电影</Text>
                                        </View>
                                    </View>
                                )}
                                numColumns={3}
                                // 保证RefreshControl显示loading start
                                style={{ flex: 1 }}
                                contentContainerStyle={{
                                    marginTop: 20,
                                    flexGrow: 1,
                                    minHeight: '100%' // 确保内容容器有最小高度
                                }}
                                // 保证RefreshControl显示loading end
                                columnWrapperStyle={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    gap: 12,
                                    // paddingHorizontal: 16,
                                    marginBottom: 15,
                                }}
                                data={movieList}
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                                keyExtractor={(item) => item.id.toString()}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={pullRefresh}
                                        title="刷新中 ..."

                                        // iOS 专用属性
                                        tintColor="#FFFFFF"        // iOS 旋转指示器颜色
                                        titleColor="#FFFFFF"       // iOS 标题颜色

                                        // Android 专用属性  
                                        colors={['#FF0000']}       // Android 进度圆圈颜色
                                        progressBackgroundColor="#FFFFFF" // Android 背景色
                                        progressViewOffset={50}
                                    />
                                }
                                renderItem={({ item, index }) => (
                                    <MovieCard {...{ ...item, isVertical: true }} />
                                )}
                            />
                        )
                }
            </View>
        </View>
    );
}