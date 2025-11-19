import MovieReview from '@/components/refact-detail/MovieReview';
import MovieSummary from '@/components/refact-detail/MovieSummary';
import MovieTabBar from '@/components/refact-detail/MovieTabBar';
import { fetchMovieDetail } from '@/hooks/useMovie';
import { MovieDetail } from '@/interfaces/interfaces';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { NavigationState, Route, SceneMap, TabView } from 'react-native-tab-view';

export default function MovieDetailPage() {
    const [detail, setDetail] = useState<MovieDetail>();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const movieDtail = async () => {
            const deatil = await fetchMovieDetail(Number(id))
            setDetail(deatil)
        }
        movieDtail()
    }, [])

    const [tabNavState, setTabNavState] = useState<NavigationState<Route>>({
        index: 0, // routes数组的索引，表示哪个页面被选中
        routes: [
            { key: 'detail', title: '详情' },
            { key: 'review', title: '评论' }
        ]
    })
    const sceneMap = SceneMap({
        detail: () => <MovieSummary detail={detail}/>,
        review: () => <MovieReview movieId={Number(id)} />
    });
    const handleIndexChange = (index: number) => {
        setTabNavState(prev => {
            return { ...prev, index }
        })
    };
    const lazyPlaceholder = () => (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-light-200 text-base'>评论加载中...</Text>
        </View>
    )
    
    return (
        <View className='flex-1 bg-primary'>
            <TabView
                lazy
                // renderLazyPlaceholder={lazyPlaceholder}
                renderScene={sceneMap}
                navigationState={tabNavState}
                onIndexChange={handleIndexChange}
                renderTabBar={props => <MovieTabBar props={props} bgImgUrl={detail?.backdrop_path ?? ''} />}
            />
        </View>
    );
}