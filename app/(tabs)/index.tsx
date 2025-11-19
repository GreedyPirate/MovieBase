import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { images } from '@/constants/images';
import { getTopMovies } from '@/hooks/useMovie';
import { MovieList } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';
export default function Index() {
    const [movieList, setMovieList] = useState<MovieList>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

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

    useEffect(() => {
        loadMovieList(1, true);
    }, []);

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
                            ListHeaderComponent={() => (
                                <>
                                    <View className="mb-4 px-2">
                                        <Text className="text-white">最新电影</Text>
                                    </View>
                                </>
                            )}
                            numColumns={3}
                            // 保证RefreshControl显示loading start
                            style={{ flex: 1 }}
                            contentContainerStyle={{
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