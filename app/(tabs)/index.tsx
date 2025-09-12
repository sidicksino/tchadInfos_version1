import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getStyles } from "../../assets/styles/home.Style";
import BreakingNews from "../../components/breakingNwes";
import Categories from "../../components/categories";
import Header from "../../components/header";
import Loading from "../../components/loading";
import News from "../../components/news";
import TodayList from "../../components/todayList";
import { ThemeContext } from "../../context/ThemeContext";
import { NewsDataType } from "../../types/index";

const index = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&country=td&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  const getNews = async (category: string = '') => {
    let categoryString = '';
    if (category.length !== 0 ){
      categoryString = `&category=${category}`
    }
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  const onCatChanged = (category: string) => {
    console.log("Categories", category);
    setNews([]);
    getNews(category);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <>
            <BreakingNews newsList={breakingNews} />
            <TodayList newsList={breakingNews} />
          </>
        )}
        <Categories onCategoryChanged={onCatChanged} />
        <News newsList={news} />
      </ScrollView>
    </View>
  );
};

export default index;
