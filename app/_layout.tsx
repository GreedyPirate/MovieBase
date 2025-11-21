import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
  // 直接隐藏状态栏，电量，wifi，信号
  {

  }
  // ActionSheetProvider只能有一个子元素
  return <ActionSheetProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style='light' hidden={false}></StatusBar>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pages/search" options={{ headerShown: false }} />
          <Stack.Screen name="pages/moveDetail" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="pages/camera" options={{ headerShown: false }} />
        </Stack>
    </GestureHandlerRootView>
  </ActionSheetProvider>
}

// export default function RootLayout() {
//   return <Stack>
//       <Stack.Screen name="(demos)/(router)/page1" options={{headerShown:false}}/>
//       <Stack.Screen name="(demos)/(router)/page2" options={{title:"自定义标题", 
//           headerStyle: {
//             backgroundColor: '#6a5acd', // 背景色
//           },
//           headerBackTitle: 'Back',
//           headerTintColor: '#fff',      // 返回按钮和标题文字颜色
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             fontSize: 20,
//           },}}/>
//     </Stack>;
// }
