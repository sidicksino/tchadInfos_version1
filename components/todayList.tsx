import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {};

const todayList = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.todayTextContent}>
        <Text style={styles.todayText}>Aujourd’hui</Text>
        <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayButtonText}>Plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default todayList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  todayTextContent:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    alignContent: "center"
  },
  todayText:{
    fontSize: 18,
    fontFamily: "Epilogue_500Medium"
  },
  todayButton:{
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  todayButtonText:{
    color: "#FF3B30",
    fontSize: 11,
    fontFamily: "Epilogue_500Medium"
  }
});
