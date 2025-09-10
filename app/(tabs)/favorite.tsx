import React, { useContext } from "react";
import { Text, View } from "react-native";
import { getStyles } from "../../assets/styles/favorite.Style";
import Header from "../../components/header";
import { ThemeContext } from "../../context/ThemeContext";

const favorite = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <View style={styles.container}>
      <Header/>
      <Text>favorite</Text>
    </View>
  )
}

export default favorite