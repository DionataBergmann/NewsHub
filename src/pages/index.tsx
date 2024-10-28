import CategoryCarousel from '@/components/organisms/CategoryCarousel';
import Header from '@/components/organisms/Header';
import NewsLayout from '@/components/templates/NewsLayout';
import { getGeneralNews, getNewsByCategory, searchNews } from '@/services/newsService';
import { useEffect, useState } from 'react';

interface Article {
  title: string;
  description: string;
  author: string;
  content: string;
  urlToImage: string;
  publishedAt: string;
  url?: string; 
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const [news, setNews] = useState<Article[]>([]); 
  const [newsByCategory, setNewsByCategory] = useState<Article[]>([]); 

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    try {
      const categoryNews = await getNewsByCategory(category);
      setNewsByCategory(categoryNews);
    } catch (error) {
      console.error('Error loading news by category', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (query) {
      try {
        const searchResults = await searchNews(query);
        setNewsByCategory(searchResults);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    } else {
      handleCategoryChange(selectedCategory);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const categoryNews = await getNewsByCategory(selectedCategory);
        setNewsByCategory(categoryNews);
        const generalNews = await getGeneralNews();
        setNews(generalNews);
      } catch (error) {
        console.error('Error loading news', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  console.log('newsByCategory', newsByCategory)

  return (
    <>
      <Header />

      <NewsLayout selectedCategory={selectedCategory} news={news} />

      <CategoryCarousel onSelectCategory={handleCategoryChange} onSearch={handleSearch} />

      <NewsLayout selectedCategory="General" news={news} />
    </>
  );
}