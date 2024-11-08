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
export const summarizeNews = async (articles: Article[]): Promise<string> => {
  try {
    const messages = [
      { role: "system", content: "You are a news anchor summarizing news articles in a clear and concise manner, with an engaging journalistic tone." },
      {
        role: "user",
        content: `Imagine you are presenting these news articles on a live news broadcast. For each article, provide a brief but informative summary that captures the key points from the title, description, and content. Make sure to maintain a professional and journalistic tone.
    
        Here are the articles:
    
        ${articles?.map((desc, index) => `News ${index + 1}: 
        Title: ${desc.title}
        Description: ${desc.description}
        Content: ${desc.content}`).join('\n\n')}
    
        Summarize each article as if you were speaking live on air, providing the key highlights in a way that keeps the audience engaged.`
      }
    ];

    const response = await axios.post(process.env.NEXT_PUBLIC_OPENAI_CHAT_URL as string, {
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 3000,  
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary with AI:', (error as Error).message);
    throw error;
  }
};
    throw error;
  }
};
  