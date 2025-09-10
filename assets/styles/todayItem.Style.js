import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const getStyles = (COLORS) => StyleSheet.create({
    itemWrapper: {
        width: 178,
        height: 151,
        marginRight: 20,
        paddingHorizontal: 10,

    },
    image: {
        width: 178,
        height: 151,
        borderRadius: 20,
    },
    backround: {
        position: "absolute",
        width: 178,
        height: 151,
        borderRadius: 20,
        padding: 10,
        left: 10,
    },
    sourceInfos: {
        position: "absolute",
        top: 125,
        paddingHorizontal: 20,
    },
    sourceName: {
        color: COLORS.background,
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Epilogue_700Bold",
    },
    title: {
        color: COLORS.background,
        fontSize: 16,
        position: "absolute",
        fontFamily: "Epilogue_400Regular",
        top: 160,
        fontWeight: "200",
        paddingHorizontal: 20,
        lineHeight: 20,
        letterSpacing: 0.5
    },
});
