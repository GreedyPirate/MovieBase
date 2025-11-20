import { LinearGradient } from 'expo-linear-gradient';
import { Smartphone } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface SignHeaderProps {
    title: string,
    subtitle: string;
}
export default function SignHeader({title, subtitle}: SignHeaderProps) {
    return (
        <View className='bg-dark-100 px-8 pb-8 pt-16 h-236 items-center justify-center'>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#a855f7', '#ec4899']}
                style={{ 
                    width: 64, height: 64,  borderRadius: 14, 
                    justifyContent: 'center', alignItems: 'center',
                    marginBottom: 16,
                }}
                >
                <Smartphone  color="white" size={32}  />
            </LinearGradient>
            <Text className='text-white text-3xl mb-2'>Welcome Back!</Text>
            <Text className='text-gray-400 text-base'>Sign in to continue</Text>
        </View>
    );
}