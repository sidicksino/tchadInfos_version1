import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
    StyleSheet.create({
        header: {
            backgroundColor: COLORS.background,
            paddingHorizontal: 10,
            paddingTop: 5,
            marginBottom: 20,
        },
        headerTop: {
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerBottom: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
        },
        logo: {
            width: 200,
            height: 33,
            resizeMode: "contain",
            color: COLORS.text + "90",
        },
        notification: {
            backgroundColor: COLORS.text + "80",
            padding: 10,
            borderRadius: 30,
        },
        searchBox: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            backgroundColor: COLORS.text + "10",
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 12,
            marginRight: 0,
            borderWidth: 1,
            borderColor: COLORS.text + "20",
        },
        inputResearch: {
            flex: 1,
            fontSize: 16,
        },
        reseachIcon:{
            marginRight: 10,
            color: COLORS.text + "90",            
        },
        profile: {
            marginLeft: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderRadius: 8,
            resizeMode: "cover",
            backgroundColor: COLORS.text + "10",
            borderWidth: 1,
            borderColor: COLORS.text + "20",
            color: COLORS.text + "90",
            
        },
        reseachText:{
            color: "#A5ABB9",
            fontSize: 16,
            fontFamily: "Epilogue_400Regular",
        },

    });
