// MovieTabBar.tsx
import { Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavigationState, Route, SceneRendererProps, TabDescriptor } from 'react-native-tab-view';

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
          style={[imageScaleStyle]}
          resizeMode='cover' />
      </GestureDetector>


      <View className="flex-row px-4">
        {routes.map((route) => (
          <View key={route.key} className="px-3 py-2">
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.jumpTo(route.key)}>
              <Text className="text-white text-lg font-semibold">{route.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}