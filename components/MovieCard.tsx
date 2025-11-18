import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
    id: number;
    poster_path: string | null;
    release_date: string,
    vote_average: number,
    title: string,
}
export default function MovieCard({ id, poster_path, release_date, vote_average, title }: MovieCardProps) {
    const router = useRouter();
    const forwardDetail = () => {
        router.push({
            pathname: '/pages/moveDetail',
            params: { id: id },
        });
    }
    return (
        <View className="w-[30%] ml-1">
            <TouchableOpacity onPress={forwardDetail} activeOpacity={0.6} className='relative w-full'>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                    className="w-full rounded-lg"
                    style={{ aspectRatio: 2 / 3 }}
                    resizeMode="cover" />

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