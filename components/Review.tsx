import { images } from '@/constants/images';
import { fetchMovieReviews } from '@/hooks/useMovie';
import { MovieDetail, MovieReviews } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { Image, Text, TextLayoutEvent, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CommentFooter from './CommentFooter';
import ExpandableText from './ExpandableText';
import MovieDetailPart from './MovieDetailPart';
import ReadableTimeText from './ReadableTimeText';

interface ReviewProps {
    movieId: number,
    detail?: MovieDetail
}
export default function Review({movieId, detail}:ReviewProps) {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState<MovieReviews>([]);
    const [contentLines, setContentLines] = useState(3);
    useEffect(() => { 
        const loadReviews = async () => {
            const reviews = await fetchMovieReviews(movieId , page) 
            setReviews(reviews.results)
        }
        loadReviews()
    }, [])
    const handleLayout = (e:TextLayoutEvent) => {
        console.log('lines', e.nativeEvent.lines.length);
        setContentLines(e.nativeEvent.lines.length);
    };
    return (
        <View className='flex-1'>
            <FlatList
                contentContainerStyle={{
                    paddingBottom: 100,
                    flexGrow: 1,
                    minHeight: '100%' // 确保内容容器有最小高度
                }}
                style={{ flex: 1 }}
                ListHeaderComponent={(
                    <MovieDetailPart detail={detail} />
                )}
                ListEmptyComponent={(
                    <View className='flex-1 items-center justify-center'>
                        <Text className='text-light-200 text-base text-center'>暂无评论, 快来发表第一条评论吧~</Text>
                    </View>
                )}
                data={reviews}
                renderItem={({ item, index }) => (
                    <View className='flex-row gap-x-2 mt-5 px-5'>
                        <Image source={{
                                uri: item?.author_details?.avatar_path
                                    ? 
                                    `https://image.tmdb.org/t/p/w500${item?.author_details?.avatar_path}` 
                                    : 
                                    images.unknownUser
                                }}
                            className='size-10 rounded-full'
                        />
                        <View className='flex-1 gap-y-2 mt-2'>
                            <Text className='text-light-200 text-sm'>{item?.author_details?.username}</Text>
                            <ExpandableText text={item?.content} maxLines={3}/>
                            <ReadableTimeText text={item?.created_at}/>
                        </View>
                    </View>
                )}/>
            <CommentFooter/>
        </View>
    );
}