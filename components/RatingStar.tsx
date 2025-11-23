import { splitDecimal } from '@/hooks/utils';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from 'react-native';

interface RatingStarProps {
    vote_average?: number,
    vote_count?: number
}
export default function RatingStar({vote_average, vote_count} : RatingStarProps) {
    const ratingStart = (vote_average: number) => {
        if (!vote_average) {
            return []
        }
        const oriRating = Math.round(vote_average)
        const halfRating = oriRating / 2
        const { integer, decimal } = splitDecimal(halfRating)
        const starIcons = []
        for (let i = 0; i < integer; i++) {
            starIcons.push(<FontAwesome key={i.toString()} name="star" size={16} color="#FFE400" />)
        }
        if (integer - decimal > 0) {
            starIcons.push(<FontAwesome key="half" name="star-half-empty" size={16} color="#FFE400" />)
        }
        return (starIcons)
    }
    return (
            <View className='self-start flex-row item-center gap-x-2 bg-dark-100 rounded-md px-2 py-2 my-1'>
                {ratingStart(vote_average ?? 0)}
                <Text className='text-white text-sm font-bold'>{vote_average?.toFixed(0) ?? 0}/10</Text>
                <Text className='text-light-200 text-sm'>({vote_count} voted)</Text>
            </View>
    );
}