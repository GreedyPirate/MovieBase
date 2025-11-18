import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, Pressable, Text, View } from 'react-native';
export default function SearchHistory() {
    const [searchHistory, setSearchHistory] = useState<{ id: number, name: string }[]>([{ "id": 0, "name": "肖申克的救赎" }, { "id": 1, "name": "阿甘正传" }, { "id": 2, "name": "盗梦空间" }, { "id": 3, "name": "泰坦尼克号" }, { "id": 4, "name": "星际穿越" }, { "id": 5, "name": "这个杀手不太冷" }, { "id": 6, "name": "千与千寻" }, { "id": 7, "name": "复仇者联盟：终局之战" }, { "id": 8, "name": "搏击俱乐部" }, { "id": 9, "name": "楚门的世界" }, { "id": 10, "name": "飞屋环游记" }, { "id": 11, "name": "寄生虫" }, { "id": 12, "name": "教父" }, { "id": 13, "name": "蝙蝠侠：黑暗骑士" }, { "id": 14, "name": "美丽人生" }, { "id": 15, "name": "海豚湾" }, { "id": 16, "name": "少年派的奇幻漂流" }, { "id": 17, "name": "头号玩家" }, { "id": 18, "name": "绿皮书" }, { "id": 19, "name": "流浪地球" }]);
    const [displayHistory, setDisplayHistory] = useState<{ id: number, name: string }[]>(searchHistory.slice(0, 9))
    const [toggleHistory, setToggleHistory] = useState(false);

    const handleToggleHistory = () => {
        setDisplayHistory(prev => {
            if (toggleHistory) {
                return prev.slice(0, 9)
            } else {
                return searchHistory
            }
        })
        setToggleHistory(prev => {
            return !prev
        })
    }

    const clearHistory = () => { 
        Alert.alert(
            "确认删除",
            ``,
            [
                {
                    text: "取消", style: "cancel"
                },
                {
                    text: "确认",
                    style: "destructive",
                    onPress: () => {
                        setDisplayHistory([])
                        // 同步search源数据
                        setSearchHistory([])
                    }
                }
            ]
        );
    }
    const deleteHistoryItem = (id: number) => {
        Alert.alert(
            "确认删除",
            ``,
            [
                {
                    text: "取消", style: "cancel"
                },
                {
                    text: "确认",
                    style: "destructive",
                    onPress: () => {
                        setDisplayHistory(prev => prev.filter((_, i) => i !== id))
                        // 同步search源数据
                        setSearchHistory(prev => prev.filter((_, i) => i !== id))
                    }
                }
            ]
        );
    }
    return (
        <View className='w-full'>
            <View className='px-5 flex-row items-center justify-between'>
                <Text className='text-white text-xl font-bold'>历史</Text>
                <Pressable onPress={clearHistory}>
                    <EvilIcons name="trash" size={24} color="#BFB6B6" />
                </Pressable>
            </View>
            <FlatList
                data={displayHistory}
                contentContainerStyle={{
                    flexGrow: 1,
                    minHeight: 200,
                }}
                ListEmptyComponent={() => (
                    <View className='h-full flex-row flex-1 items-center justify-center'>
                        <Text className='text-slate-300 text-sm'>暂无数据~</Text>
                    </View>
                )}
                columnWrapperStyle={{
                    gap: 10,
                    paddingHorizontal: 16,
                    marginBottom: 10,
                    marginTop: 10
                }}
                numColumns={3}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({ item, index }) => (
                        <Pressable className='px-3 py-2 rounded-full bg-slate-800'
                            onLongPress={() => { deleteHistoryItem(item.id) }}>
                            {/* <FontAwesome className='absolute top-[-5] right-[-2]' name="remove" size={16} color="#94A3B8" /> */}
                            <Text className='text-white text-base'>{item.name}</Text>
                        </Pressable>
                    )
                }
            />
            {
                searchHistory.length > 9 && (
                    <View className='px-5 items-center'>
                        <Pressable className='flex-row item-center' onPress={handleToggleHistory}>
                            <Text className='text-slate-400 text-base font-bold mr-2'>{toggleHistory ? '收起' : '展开'}</Text>
                            <SimpleLineIcons className='self-center' name={toggleHistory ? 'arrow-down' : 'arrow-up'} size={12} color="#94A3B8" />
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
}