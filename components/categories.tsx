import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../constants/Categories";

const CategoriesComponent = () => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<Array<React.ElementRef<typeof TouchableOpacity> | null>>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryPress = (index: number) => {
    setActiveCategory(index);
    // Scroll automatique vers la catégorie sélectionnée
    itemRef.current[index]?.measureLayout(
      scrollRef.current as any,
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ x: x - 10, y: 0, animated: true });
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            ref={(el) => (itemRef.current[index] = el)}
            style={[
              styles.categoryButton,
              activeCategory === index && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryPress(index)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === index && styles.activeCategoryText,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeCategoryButton: {
    backgroundColor: "#FF3B30",
  },
  categoryText: {
    fontSize: 12,
    color: "#FF3B30",
    fontFamily: "Epilogue_400Bold",
    letterSpacing: 0.5,
  },
  activeCategoryText: {
    color: "#fff",
  },
});
