import DetailHeader from '@/components/DetailHeader';
import Review from '@/components/Review';
import { fetchMovieDetail } from '@/hooks/useMovie';
import { MovieDetail } from '@/interfaces/interfaces';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

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
    return (
        <View className='flex-1 bg-primary'>
            <DetailHeader/>
            {
                detail?.id && 
                (
                    <Review movieId={detail.id} detail={detail}/>
                )
            }
        </View>
    );
}