import React, { useRef, useState } from "react";
import { StyleSheet, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { NewsDataType } from "../types";
import Pagination from "./pagination";
import SliderItem from "./sliderItem";

type Props = {
  newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });


  const onViewableItemsChanged = ({ 
    viewableItems, 
  }:{ 
    viewableItems: ViewToken[] 
  } ) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index % newsList.length);
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig, onViewableItemsChanged,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
          viewabilityConfigCallbackPairs= {
            viewabilityConfigCallbackPairs.current
          }
        />
        <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex}/>
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  slideWrapper: {
    //width: "100%",
    justifyContent: "center",
    //flex: 1,
  },
});
