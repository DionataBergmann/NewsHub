import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

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

export const summarizeNews = async (articles: any[]) => {
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

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
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
    console.error('Erro ao gerar resumo com IA:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const synthesizeSpeech = async (message: string) => {
  const input = message;
  const model = 'tts-1';  
  const voice = 'alloy'; 

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      { input, model, voice },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,  
          'Content-Type': 'application/json',
        },
        responseType: 'blob',  
      }
    );

    return URL.createObjectURL(response.data);  
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error; 
  }
};
