
import { MovieDetail, ProductCompany } from '@/interfaces/interfaces';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import ExpandableText from './ExpandableText';
import RatingStar from './RatingStar';

interface MovieDetailPartProps {
  detail?: MovieDetail;
}
export default function MovieDetailPart({detail}: MovieDetailPartProps) {
    const defaultImageHeight = 300
    const imageScaleHeight = useSharedValue(defaultImageHeight)
    const insets = useSafeAreaInsets();
    const router = useRouter()
    
    const imageScaleStyle = useAnimatedStyle(() => {
        return {
            height: withSpring(imageScaleHeight.value),
        }
    })
    const dragZoomOut = Gesture.Pan()
        // .minDistance(30)
        // .onUpdate((e) => {
        //     const {translationX, translationY, x, y} = e
        //     const isHorizontal = Math.abs(translationX) > Math.abs(translationY)
        // })
        .onChange((e) => {
            // 只能往下拖拽
            if (e.changeY < 0) {
                return
            }
            imageScaleHeight.value += (e.changeY / 3)
        })
        .onEnd((e) => {
            imageScaleHeight.value = withSpring(defaultImageHeight, {
                damping: 18,
                mass: 0.5,
            })
        })

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
    return (
        <GestureDetector gesture={dragZoomOut}>
            <SafeAreaProvider>
                <View className='flex-1 bg-primary'>
                    <Animated.Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${detail?.backdrop_path}` }}
                        style={[imageScaleStyle]}
                        resizeMode='cover' />

                    <View className='px-5 mt-5 gap-y-2'>
                        <Text className='text-white text-xl font-bold'>{detail?.title}</Text>
                        <View className='flex-row gap-x-2'>
                            <Text className='text-light-200 text-sm'>{detail?.release_date?.split('-')[0]}</Text>
                            <Text className='text-light-200 text-sm'>{detail?.runtime}m</Text>
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

                        <View className='gap-y-3'>
                            <Text className='text-light-200 text-sm'>Overview</Text>
                            <ExpandableText text={detail?.overview??''} maxLines={3}/>
                        </View>
                    </View>
                </View>
            </SafeAreaProvider>
        </GestureDetector>
    );
}