// MovieTabBar.tsx
import DetailHeader from '@/components/DetailHeader';
import { Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavigationState, Route, SceneRendererProps, TabBar, TabDescriptor } from 'react-native-tab-view';

interface MovieTabBarProps {
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
    options: Record<string, TabDescriptor<Route>> | undefined,
  }
  bgImgUrl: string | null,
}
export default function MovieTabBar({ props, bgImgUrl }: MovieTabBarProps) {
  const { routes } = props.navigationState;

  const defaultImageHeight = 300
  const imageScaleHeight = useSharedValue(defaultImageHeight)
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

  const imageScaleStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(imageScaleHeight.value),
    }
  })
  return (
    <View className="w-full" >
      <GestureDetector gesture={dragZoomOut}>
        <Animated.Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${bgImgUrl}` }}
          style={[imageScaleStyle, { aspectRatio: 16 / 9 }]}
          resizeMode='cover' />
      </GestureDetector>
      <DetailHeader></DetailHeader>
      
      <View className="flex-row px-4">
          <TabBar {...props}
                indicatorStyle={{ backgroundColor: '#FFF' }}
                style={{ backgroundColor: 'transparent' }}
                renderTabBarItem={(prop) => {
                  return (
                    <View key={prop.route.key} className="px-3 py-2">
                      <TouchableOpacity activeOpacity={0.8} onPress={() => props.jumpTo(prop.route.key)}>
                        <Text className="text-white text-lg font-semibold"> 
                          {prop.route.title}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}/>
      </View>
    </View>
  );
}