import { recordMovieView } from '@/hooks/useMovie';
import { MovieCardProps } from '@/interfaces/interfaces';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MovieCard({ id, poster_path, release_date, vote_average, title, isVertical }: MovieCardProps) {
    const router = useRouter();
    const forwardDetail = () => {
        router.push({
            pathname: '/pages/moveDetail',
            params: { id: id },
        });
        recordMovieView(id)
    }
    return (
        // 30%仅限FlatList垂直列表，此时FlatList宽度固定, 水平列表只能设置固定值
        <View className="ml-1" style={{ width: isVertical ? '30%' : 100 }}>
            <TouchableOpacity onPress={forwardDetail} activeOpacity={0.6} className='relative w-full'>
                <View className="w-full rounded-lg overflow-hidden">
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                        style={{ aspectRatio: 2 / 3 }}
                        contentFit="cover" 
                    />
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255,255,255,0.1)', 'rgba(0,0,0,0.8)']}
                        className="size-full absolute bottom-0 left-0 right-0 h-full"
                    />
                </View>
                
                {
                    release_date &&
                    (
                        <Text className='absolute left-1.5 top-1 text-white text-xs'>{release_date.split('-')[0]}</Text>
                    )
                }
                {/* vote_average=0表示false, 导致不在Text里，报错 */}
                {(
                    <Text className='absolute right-1 bottom-[0.5] text-white font-bold text-base'>{vote_average.toFixed(1)}</Text>
                )}
            </TouchableOpacity>
            {
                title &&
                (
                    <Text className="w-full mt-2 text-white text-center text-xs" numberOfLines={1}>{title}</Text>
                )
            }
        </View>
    );
}