import Search from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { Image, View } from 'react-native';
export default function HomeHeader() {
    return (
        <View className='px-5'>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <Search onchage={() => {}} />
        </View>
    );
}