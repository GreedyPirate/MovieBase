import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CarouselProps<T> = {
    data: T[];
    autoPlay?: boolean;
    interval?: number; // 自动播放间隔（毫秒）
    renderItem: (item: T) => React.ReactNode;
};

export default function SimpleCarousel<T>({
    data,
    autoPlay = true,
    interval = 3000,
    renderItem,
}: CarouselProps<T>) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const isAutoScrolling = useRef(false);

    // 如果数据为空或只有一个，不轮播
    if (data.length <= 1) {
        return renderItem(data[0]);
    }

    // 自动播放逻辑
    useEffect(() => {
        if (!autoPlay || data.length <= 1) return;

        const scrollInterval = setInterval(() => {
            if (flatListRef.current && !isAutoScrolling.current) {
                isAutoScrolling.current = true;
                const nextIndex = (activeIndex + 1) % data.length;
                setActiveIndex(nextIndex);
                flatListRef.current.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                // 动画结束后重置标志（简单延迟）
                setTimeout(() => {
                    isAutoScrolling.current = false;
                }, 500);
            }
        }, interval);

        return () => clearInterval(scrollInterval);
    }, [activeIndex, autoPlay, data.length, interval]);

    // 手动滑动时更新 activeIndex
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            if (index !== undefined && index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    });

    // 跳转到指定索引（用于点击分页器）
    const scrollToIndex = (index: number) => {
        if (flatListRef.current) {
            setActiveIndex(index);
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    // 渲染轮播项
    const renderCarouselItem = ({ item }: { item: T }) => (
        <View style={styles.slide}>
            {renderItem(item)}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* 轮播主体 */}
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderCarouselItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                initialNumToRender={3}
                removeClippedSubviews
            />

            {/* 分页指示器 */}
            <View style={styles.pagination}>
                {data.map((_, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => scrollToIndex(i)}
                        style={[
                            styles.dot,
                            { opacity: i === activeIndex ? 1 : 0.4 },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slide: {
        width: SCREEN_WIDTH * 0.9, // 可调整宽度
        height: 200, // 根据需求调整
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#AB8BFF', // 主题色
        marginHorizontal: 4,
    },
});