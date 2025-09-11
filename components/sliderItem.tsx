import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getStyles } from "../assets/styles/sliderItem.Style";
import { ThemeContext } from "../context/ThemeContext";
import { NewsDataType } from "../types";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
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
        <Text style={styles.title} numberOfLines={3}>
          {slideItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;