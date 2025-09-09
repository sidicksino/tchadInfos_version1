import SafeScreen from "@/components/SafeScreen";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View } from "react-native";



const TabsLayout = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  return (
    <SafeScreen>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.income,
          tabBarInactiveTintColor: COLORS.text,
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.card,
            borderTopWidth: 0,
            position: "absolute",
            left: 0,
            right: 0,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            padding: 4,
            fontSize: 13,
            fontWeight: "300",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: "video",
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-circle-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="live"
          options={{
            title: "Live",
            tabBarIcon: ({ color }) => (
              <View style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={30} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeScreen>
  );
};

export default TabsLayout;
