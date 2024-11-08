import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  PopoverHeader,
  Spinner,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import { searchNews, summarizeNews, synthesizeSpeech } from '@/services/newsService';
import AudioPlayer from '../AudioPlayer';
import FavoriteNewsItemList from '../FavoriteNewsItemList';

interface FavoriteNewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const Header = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteNewsItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleGenerateClick = async () => {
    if (inputValue) {
      setIsLoading(true);
      try {
        const articles = await searchNews(inputValue);
        const descriptions = articles.slice(0, 5).map((article) => article);
        const aiSummary = await summarizeNews(descriptions);

        const audioUrl = await synthesizeSpeech(aiSummary);
        setAudioSrc(audioUrl);
        setShowAudioPlayer(true);
      } catch (error) {
        console.error('Error generating news summary:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Please enter a topic.');
    }
  };

  return (
    <Box as="header" bg="black" p={4} boxShadow="lg" color="white">
      <Flex align="center" maxW="1200px" mx="auto" px={4}>
        <Box fontSize="2xl" fontWeight="bold" mr={4}>
          NewsHub
        </Box>

        <Spacer />

        <Flex w={['100%', '100%', '40%']} mb={[4, 0]} align="center">
          <InputGroup>
            <Input
              placeholder="Enter a topic to generate a summary..."
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              borderRadius="full"
              size="md"
              flex="1"
              mr={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <InputRightElement mr={2}>
              <AiOutlineSearch size="20px" color="gray" />
            </InputRightElement>
          </InputGroup>

          <Box ml={0}>
            <Popover trigger="hover" placement="right">
              <PopoverTrigger>
                <Button borderRadius="full" backgroundColor="white" color="gray.600" onClick={handleGenerateClick} disabled={isLoading}>
                  Generate
                </Button>
              </PopoverTrigger>
              <PopoverContent color="black" bg="white" borderColor="gray.200" mt={2}>
                <PopoverArrow />
                <PopoverHeader>
                  An audio will be generated using A.I. with a brief summary of the main news of the day based on the entered topic.
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        <Spacer />

        <Box>
          <Popover>
            <PopoverTrigger>
              <Button leftIcon={<AiFillStar />} bgColor="yellow" variant="solid" borderRadius="md" size="md">
                Favorites
              </Button>
            </PopoverTrigger>
            <PopoverContent color="black" bg="white" borderColor="gray.200" mt={2} maxW="600px" minW={500}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody mt={5}>
                {favorites.length > 0 ? (
                  <FavoriteNewsItemList favorites={favorites} /> 
                ) : (
                  <Text>No favorited news yet.</Text>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4} mr={125}>
          <Spinner size="md" />
          <Text ml={3} fontSize="lg">Generating summary...</Text>
        </Box>
      ) : showAudioPlayer && (
        <Box mt={0} display="flex" justifyContent="center" ml={-8}>
          <AudioPlayer src={audioSrc} />
        </Box>
      )}
    </Box>
  );
};

export default Header;
