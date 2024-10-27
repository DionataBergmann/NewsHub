import Header from '@/components/organisms/Header';
import NewsLayout from '@/components/templates/NewsLayout';
import { getGeneralNews } from '@/services/newsService'; 
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
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const generalNews = await getGeneralNews();
        setNews(generalNews);
      } catch (error) {
        console.error('Erro ao carregar notícias', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <NewsLayout selectedCategory="General" news={news} />
    </>
  );
}