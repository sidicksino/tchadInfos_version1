import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { NewsDataType } from "../types";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const sliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgb(0,51,160)"]}
        style={styles.backround}
      >
        <View style={styles.sourceInfos}>
          <Text style={styles.sourceName}>{slideItem.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {slideItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default sliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  backround: {
    position: "absolute",
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceInfos: {
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
  },
  sourceName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    position: "absolute",
    top: 120,
    fontWeight: "600",
    paddingHorizontal: 20,
  },
});
