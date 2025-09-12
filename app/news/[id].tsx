import SafeScreen from "@/components/SafeScreen";
import Loading from "@/components/loading";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { NewsDataType } from "../../types/index";
type Props = {};

const { width } = Dimensions.get("screen");
const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  return (
    <SafeScreen>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <View style={styles.container}>
          <View>
            <Image source={{ uri: news[0].image_url }} style={styles.image} />

            {/* Header sur l'image */}
            <View style={styles.headerSearche}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Ionicons
                  name="arrow-back"
                  size={22}
                  style={styles.backIcons}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.backButton}>
                <Ionicons
                  name="bookmark-outline"
                  size={22}
                  style={styles.backIcons}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenu texte */}
          <ScrollView>
            <View style={styles.content}>
              <Text style={styles.title}>{news[0].title}</Text>
              <Text style={styles.description}>{news[0].description}</Text>
              <Text style={styles.contentText}>{news[0].content}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeScreen>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: 350,
  },
  headerSearche: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: "#00000050",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcons: {
    color: "#fff",
  },
  content: {
    padding: 15,
  },
  title: {
    marginVertical: 10,
    fontSize: 19,
    marginBottom: 10,
    fontFamily: "times new roman",
    lineHeight: 23,
    letterSpacing: 0.6,
    fontWeight: "900",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    fontFamily: "times new roman",
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: 0.6,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
