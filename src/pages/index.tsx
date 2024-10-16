import CategoryCarousel from '@/components/organisms/CategoryCarousel';
import Header from '@/components/organisms/Header';
import NewsList from '@/components/organisms/NewsList';
import NewsLayout from '@/components/templates/NewsLayout';
import { getGeneralNews, getNewsByCategory, searchNews } from '@/services/newsService';
import { useEffect, useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('General');
  const [news, setNews] = useState([]);
  const [newsByCategory, setNewsByCategory] = useState([]);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    try {
      const categoryNews = await getNewsByCategory(category);
      setNewsByCategory(categoryNews);
    } catch (error) {
      console.error('Erro ao carregar notícias por categoria', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (query) {
      try {
        const searchResults = await searchNews(query);
        setNewsByCategory(searchResults);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
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
        console.error('Erro ao carregar notícias', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <>
      <Header />

      <NewsLayout selectedCategory={selectedCategory} news={news} />

      <CategoryCarousel onSelectCategory={handleCategoryChange} onSearch={handleSearch} />

      <NewsList news={newsByCategory} />
    </>
  );
}
