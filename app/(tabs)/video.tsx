import React, { useContext } from "react";
import { View } from "react-native";
import { getStyles } from "../../assets/styles/video.Style";
import Header from "../../components/header";
import VideoNewsScreen from "../../components/videoList";
import { ThemeContext } from "../../context/ThemeContext";

const video = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <View style={styles.container}>
      <Header/>
      <VideoNewsScreen/>
    </View>
  )
}

export default video