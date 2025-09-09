import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getStyles } from "../assets/styles/onboarding.Style";
import CustomButton from "../components/button";
import { ThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

interface Page {
  id: string;
  image?: any;
  logo?: any;
  background_image?: any;
  title: string;
  content?: string;
  buttonText: string;
}

const pages: Page[] = [
  {
    id: "1",
    image: require("../assets/images/onboarding.png"),
    logo: require("../assets/images/ti_logo.png"),
    title: "Bienvenue À Tchadinfos.com",
    buttonText: "Get Start",
  },
  {
    id: "2",
    background_image: require("../assets/images/download (1).png"),
    title: "Toujours informé, où que vous soyez",
    content:
      "Bienvenue dans notre app d’actualités, votre référence pour les infos en direct, les exclusivités et un contenu adapté à vos centres d’intérêt.",
    buttonText: "Suivant",
  },
  {
    id: "3",
    background_image: require("../assets/images/download (1).png"),
    title: "Vivez l’actualité autrement, dès aujourd’hui !",
    content:
      "Rejoignez notre communauté active d’amateurs d’info. Exprimez-vous et échangez dans des discussions captivantes.",
    buttonText: "Suivant",
  },
];

export default function Index() {
  const router = useRouter();
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(tabs)");
    }
  };

  const renderItem = ({ item }: { item: Page }) => (
    <View style={[styles.page, { width, flex: 1 }]}>
      {/* Page 1 : image et logo */}
      {item.image && item.logo && (
        <>
          <Image source={item.image} style={styles.welcomeImage} />
          <Image source={item.logo} style={styles.ti_logo} />
          {/* Contenu */}
          <LinearGradient
            colors={["transparent", "rgb(0,51,160)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0.9 }}
            style={[styles.background, { position: "absolute" }]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <TouchableOpacity
          style={styles.buttonPasser}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.textPasser}>Passer</Text>
        </TouchableOpacity>
        </>
      )}

      {/* Pages 2 et 3 : background */}
      {item.background_image && (
        <>
          <Image
            source={item.background_image}
            style={[
              styles.backgroundImage,
              { position: "absolute", top: 0, left: 0 },
            ]}
          />

          {/* Gradient overlay */}
          <LinearGradient
            colors={["transparent", "rgb(0,51,160)"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 0.9 }}
            style={[styles.background, { position: "absolute" }]}
          />
          {/* Contenu */}
          <View style={styles.textContainer1}>
            <Text style={styles.title1}>{item.title}</Text>
            {item.content && (
              <Text style={styles.contentText1}>{item.content}</Text>
            )}
          </View>
          <TouchableOpacity
          style={styles.buttonPasser}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.textPasser}>Passer</Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );

  const updateIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          scrollX.setValue(offsetX);
          const index = Math.round(offsetX / width);
          setCurrentIndex(index);
        }}
        ref={flatListRef}
      />

      {/* Pagination et Bouton */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Pagination Dots */}
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          {pages.map((_, i) => {
            const widthDot = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.primary,
                  margin: 5,
                  width: widthDot,
                  opacity,
                }}
              />
            );
          })}
        </View>

        {/* Bouton Suivant/Get Start */}
        <CustomButton
          title={pages[currentIndex].buttonText}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
}
