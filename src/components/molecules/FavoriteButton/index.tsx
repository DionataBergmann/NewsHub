import { IconButton } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  url?: string;
  urlToImage: string;
  publishedAt: string;
}

interface FavoriteButtonProps {
  newsItem: NewsItem;
  size?: number;
}

const FavoriteButton = ({ newsItem, size }: FavoriteButtonProps) => {
  const [favorites, setFavorites] = useState<NewsItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateLocalStorage = (updatedFavorites: NewsItem[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const isAlreadyFavorited = prev.some((item) => item.title === newsItem.title);
      let updatedFavorites;
      if (isAlreadyFavorited) {
        updatedFavorites = prev.filter((item) => item.title !== newsItem.title);
      } else {
        updatedFavorites = [...prev, newsItem];
      }
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  const isFavorited = favorites.some((item) => item.title === newsItem.title);

  return (
    <IconButton
      aria-label="Favorite"
      size={size ? '28px' : undefined} 
      icon={isFavorited ? <AiFillStar size={size ? size : 24} /> : <AiOutlineStar size={size ? size : 24} />}
      color={isFavorited ? 'yellow' : 'gray'}
      onClick={toggleFavorite}
      position="absolute"
      top={2}
      right={2}
    />
  );
};

export default FavoriteButton;
