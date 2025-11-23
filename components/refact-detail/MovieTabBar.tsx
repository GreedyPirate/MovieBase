// MovieTabBar.tsx
import DetailHeader from '@/components/DetailHeader';
import { fetchVideoUri } from '@/hooks/useMovie';
import * as Linking from 'expo-linking';
import { Play } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { NavigationState, Route, SceneRendererProps, TabBar, TabDescriptor } from 'react-native-tab-view';

interface MovieTabBarProps {
  movieId: number;
  props: SceneRendererProps & {
    navigationState: NavigationState<Route>;
    options: Record<string, TabDescriptor<Route>> | undefined,
  }
  bgImgUrl: string | null,
}
export default function MovieTabBar({movieId, props, bgImgUrl }: MovieTabBarProps) {
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
  const [overlayStyle, setOverlayStyle] = useState({})
  const [playerColor, setPlayerColor] = useState('rgba(255,255,255, 1)')
  const [videoUri, setVideoUri] = useState<string | null>(null)
  useEffect(() => { 
    const loadVedio = async () => {
      const videoUri = await fetchVideoUri(movieId)
      if (videoUri) {
        setVideoUri(videoUri)
      }
    }
    loadVedio()
  }, []) 
  const openThirdPartyApp = async () => {
    if(!videoUri || videoUri === '') {
      console.log('没有找到视频资源')
      return
    }

    Alert.alert('提示', '是否打开第三方应用播放视频？', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '确定',
        onPress: async () => {
          const deepLink = 'vnd.youtube://' + videoUri; // youtube 深度链接
          const fallbackUrl = 'https://www.youtube.com/watch?v=' + videoUri; // 网页备用

          try {
            // 检查是否能打开该 Deep Link
            const canOpen = await Linking.canOpenURL(deepLink);
            
            if (canOpen) {
              await Linking.openURL(deepLink); // 打开第三方 App
            } else {
              await Linking.openURL(fallbackUrl); // 跳转浏览器
            }
          } catch (error) {
            console.error('打开失败:', error);
            // 可选：提示用户安装 App
          }
        },
      },
    ]);

    
  }; 
  return (
    <View className="w-full" >
      <GestureDetector gesture={dragZoomOut}>
        <View>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${bgImgUrl}` }}
            style={[imageScaleStyle, { aspectRatio: 16 / 9 }]}
            resizeMode='cover' />
          <View className='absolute left-0 top-0 right-0 bottom-0 pt-10
                  flex-row justify-center items-center'
            style={overlayStyle}>
            <Pressable onPress={openThirdPartyApp} onPressIn={() => {
              setPlayerColor('rgba(255,255,255, 0.8)')
              setOverlayStyle({ backgroundColor: 'rgba(0,0,0,0.1)' })
            }} onPressOut={() => {
              setPlayerColor('rgba(255,255,255, 1)')
              setOverlayStyle({})
            }}>
              <Play size={50} color={playerColor} />
            </Pressable>
          </View>
        </View>
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
          }} />
      </View>
    </View>
  );
}