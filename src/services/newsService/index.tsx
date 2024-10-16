import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

interface Article {
  title: string;
  description: string;
  author: string;
  content: string;
  urlToImage: string;
  publishedAt: string;
}

export const getGeneralNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/top-headlines`, {
      params: {
        country: 'us',
        apiKey: API_KEY,
      },
    });

    const filteredArticles = response.data.articles.filter(
      (article: Article) =>
        article.author &&
        article.title &&
        article.description &&
        article.urlToImage
    );

    return filteredArticles;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error;
  }
};

export const getNewsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/top-headlines`, {
      params: {
        country: 'us',
        category: category || 'General',
        apiKey: API_KEY,
      },
    });

    const filteredArticles = response.data.articles.filter(
      (article: Article) =>
        article.author &&
        article.title &&
        article.description &&
        article.urlToImage
    );

    return filteredArticles;
  } catch (error) {
    console.error(`Erro ao buscar notícias da categoria ${category}:`, error);
    throw error;
  }
};

export const searchNews = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY,
      },
    });

    const filteredArticles = response.data.articles.filter(
      (article: Article) =>
        article.author &&
        article.title &&
        article.description &&
        article.urlToImage
    );

    return filteredArticles;
  } catch (error) {
    console.error(`Erro ao buscar notícias sobre: ${query}`, error);
    throw error;
  }
};
    throw error;
  }
};
