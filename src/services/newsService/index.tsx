import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY as string;

interface Article {
  title: string;
  description: string;
  author: string;
  content: string;
  urlToImage: string;
  publishedAt: string;
}

interface NewsAPIResponse {
  articles: Article[];
}

export const getGeneralNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get<NewsAPIResponse>(`${API_URL}/top-headlines`, {
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
    console.error('Erro ao buscar notícias:', (error as Error).message);
    throw error;
  }
};

export const getNewsByCategory = async (category: string): Promise<Article[]> => {
  try {
    const response = await axios.get<NewsAPIResponse>(`${API_URL}/top-headlines`, {
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
    console.error(`Erro ao buscar notícias da categoria ${category}:`, (error as Error).message);
    throw error;
  }
};

export const searchNews = async (query: string): Promise<Article[]> => {
  try {
    const response = await axios.get<NewsAPIResponse>(`${API_URL}/everything`, {
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
    console.error(`Erro ao buscar notícias sobre: ${query}`, (error as Error).message);
    throw error;
  }
};
  