import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { Dimensions, Image } from "react-native";
import Animated from "react-native-reanimated";
import { getStyles } from "../assets/styles/todayItem.Style";
import { ThemeContext } from "../context/ThemeContext";
import { NewsDataType } from "../types";

type Props = {
  slideItem: NewsDataType;
  index: number;
  
};

const { width } = Dimensions.get("screen");

const TodayItem = ({ slideItem, index}: Props) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <Animated.View style={[styles.itemWrapper]}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgb(0,51,160)"]}
        style={styles.backround}
      >
      </LinearGradient>
    </Animated.View>
  );
};

export default TodayItem;