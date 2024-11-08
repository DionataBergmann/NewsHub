import { Box, Text, Image, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';

interface FavoriteNewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface Props {
  favorites: FavoriteNewsItem[];
}

const FavoriteNewsItemList = ({ favorites }: Props) => {
  return (
    <Box
      maxW="100%"
      p={2}
      maxH="420px"
      overflowY="auto"
      sx={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.300',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'gray.400',
        },
      }}
    >
      {favorites.map((newsItem, index) => (
        <Flex
          key={index}
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="md"
          _hover={{ boxShadow: 'lg' }}
          mb={3}
          alignItems="flex-start"
          direction="row"
        >
          <Image
            src={newsItem.urlToImage || 'https://via.placeholder.com/100'}
            alt={newsItem.title}
            borderRadius="md"
            boxSize="60px"
            mr={3}
          />
          <Box flex="1">
            <Text fontWeight="bold" fontSize="sm" noOfLines={3} color="gray.800">
              {newsItem.title}
            </Text>
            <Box textAlign="right" mt={2}>
              <NextLink href={newsItem.url} passHref legacyBehavior >
                <a
                  style={{ color: 'blue.300', fontSize: '0.875rem', textDecoration: 'underline' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </NextLink>
            </Box>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default FavoriteNewsItemList;