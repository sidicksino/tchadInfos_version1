import React, { useContext } from "react";
import { View } from "react-native";
import { getStyles } from "../../assets/styles/video.Style";
import Header from "../../components/header";
import { ThemeContext } from "../../context/ThemeContext";

const video = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <View style={styles.container}>
      <Header/>
    </View>
  )
}

export default video