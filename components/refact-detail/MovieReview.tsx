import CommentFooter from '@/components/CommentFooter';
import ExpandableText from '@/components/ExpandableText';
import ReadableTimeText from '@/components/ReadableTimeText';
import { images } from '@/constants/images';
import { fetchMovieReviews } from '@/hooks/useMovie';
import { MovieReviews, Review } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function MovieReview({ movieId }: { movieId: number }) {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState<MovieReviews>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadReviews = async () => {
            const reviews = await fetchMovieReviews(movieId, page)
            setReviews(reviews.results)
            setLoading(false)
        }
        loadReviews()
    }, [])
    const imgSource = (item: Review) => {
        return item?.author_details?.avatar_path ?
            { uri: `https://image.tmdb.org/t/p/w500${item?.author_details?.avatar_path}` }
            :
            images.unknownUser

    }
    return (
        <View className='flex-1'>
            {
                loading ? (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size="large" color="#FFF" />
                    </View>
                ) : (
                    <View className='flex-1'>
                        <FlatList
                            contentContainerStyle={{
                                paddingBottom: 100,
                                flexGrow: 1,
                                minHeight: '100%' // 确保内容容器有最小高度
                            }}
                            style={{ flex: 1 }}
                            ListEmptyComponent={(
                                <View className='flex-1 items-center justify-center'>
                                    <Text className='text-light-200 text-base text-center'>暂无评论, 快来发表第一条评论吧~</Text>
                                </View>
                            )}
                            data={reviews}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <View className='flex-row gap-x-2 mt-5 px-5'>
                                    <Image source={imgSource(item)}
                                        className='size-10 rounded-full'
                                    />
                                    <View className='flex-1 gap-y-2 mt-2'>
                                        <Text className='text-light-200 text-sm'>{item?.author_details?.username}</Text>
                                        <ExpandableText text={item?.content} maxLines={3} />
                                        <ReadableTimeText text={item?.created_at} />
                                    </View>
                                </View>
                            )} />
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={320}
                        >
                            <CommentFooter keyHint='send' />
                        </KeyboardAvoidingView>
                    </View>

                )
            }

        </View>
    );
}