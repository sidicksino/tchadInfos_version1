import Loading from "@/components/loading";
import { NewsItem } from "@/components/news";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Link } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "../../assets/styles/favorite.Style";
import Header from "../../components/header";
import { ThemeContext } from "../../context/ThemeContext";

const Favorite = () => {
  const { COLORS } = useContext(ThemeContext);
  const themeStyles = getStyles(COLORS);

  const [selected, setSelected] = useState<"option1" | "option2">("option1");
  const [bookmarkNews, setBookmarkNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && selected === "option1") {
      fetchBookmark();
    }
  }, [isFocused, selected]);

  const fetchBookmark = async () => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      const res = token ? JSON.parse(token) : null;
      setIsLoading(true)

      if (res && res.length > 0) {
        let query_string = res.join(",");
        const response = await axios.get(
          `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
        );

        setBookmarkNews(response.data.results || []);
      } else {
        setBookmarkNews([]);
      }
    } catch (error) {
      console.error("Erreur fetchBookmark:", error);
      setBookmarkNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={themeStyles.container}>
      <Header />

      {/* Boutons Onglets */}
      <View style={style.sectorButton}>
        <TouchableOpacity
          style={[style.option, selected === "option1" && style.selectedOption]}
          onPress={() => setSelected("option1")}
        >
          <Text style={[style.optionText, selected === "option1" && style.selectedText]}>
            Actualités
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.option, selected === "option2" && style.selectedOption]}
          onPress={() => setSelected("option2")}
        >
          <Text style={[style.optionText, selected === "option2" && style.selectedText]}>
            Vidéo
          </Text>
        </TouchableOpacity>
      </View>

      {/* Affichage conditionnel */}
      <View style={style.content}>
        {selected === "option1" && (
          <>
            {isLoading ? (
              <Loading />
            ) : bookmarkNews.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 20 }}>Aucun bookmark trouvé</Text>
            ) : (
              <FlatList
                data={bookmarkNews}
                keyExtractor={(_, index) => `list_item${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Link href={`/news/${item.article_id}`} asChild key={index}>
                    <TouchableOpacity>
                      <NewsItem item={item} />
                    </TouchableOpacity>
                  </Link>
                )}
              />
            )}
          </>
        )}

        {selected === "option2" && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>Hello Vidéo 🚀</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  sectorButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 2,
    borderWidth: 1,
    borderColor: "rgba(107,114,128,0.5)",
    borderRadius: 100,
    marginHorizontal: 87,
  },
  content:{
    margin: 20,
    flex: 1
  },
  option: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 36,
    backgroundColor: "white",
  },
  selectedOption: {
    backgroundColor: "#FF3B30",
  },
  optionText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  selectedText: {
    color: "white",
  },
});

export default Favorite;
