import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import HeaderTertiaire from "@/components/headerTertiaire";
import React from "react";
import { StyleSheet, View } from "react-native";

const about = () => {
  return (
    <SafeScreenScondaire>
      <View style={styles.contenair}>
        <HeaderTertiaire />
      </View>
    </SafeScreenScondaire>
  );
};

export default about;

const styles = StyleSheet.create({
  contenair: {
    flex: 1,
    backgroundColor: "red",
  },
});
