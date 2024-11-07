import { useState } from 'react';
import FavoriteButton from '@/components/molecules/FavoriteButton';
import { Box, Grid, GridItem, Text, Image, Flex, Link, IconButton } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import NextLink from 'next/link';
import WeatherForecastWidget from '../WeatherForecastWidget';

interface NewsItem {
  title: string;
  description: string;
  url?: string;
  urlToImage: string;
  publishedAt: string;
}

interface Props {
  news: NewsItem[];
}

const NewsList = ({ news }: Props) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Box>
      <Grid templateColumns={['1fr', '2fr 1fr']} gap={4} p={4} maxW="80%" mx="auto">
        <GridItem>
          <Grid templateRows="auto" gap={4}>
            {currentNews.map((newsItem, index) => (
              <Flex
                key={index}
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                _hover={{ boxShadow: 'lg' }}
                alignItems="center"
                position="relative"
              >
                <Image
                  src={newsItem.urlToImage || 'https://via.placeholder.com/100'}
                  alt={newsItem.title}
                  borderRadius="md"
                  mr={5}
                  h={140}
                  w={250}
                />
                <Box flex="1">
                  <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.600" maxW="98%">
                    {newsItem.title}
                  </Text>
                  <Text fontSize="md" color="gray.600" noOfLines={2}>
                    {newsItem.description}
                  </Text>
                  <Box textAlign="right" mt={6}>
                    {newsItem.url ? (
                      <NextLink href={newsItem.url} passHref>
                        <Link color="blue.500" fontSize="md" _hover={{ textDecoration: 'underline' }}>
                          Read more
                        </Link>
                      </NextLink>
                    ) : (
                      <Text color="gray.500" fontSize="md">
                        No link available
                      </Text>
                    )}
                  </Box>
                </Box>
                <FavoriteButton newsItem={newsItem} size={20} />
              </Flex>
            ))}
          </Grid>

          <Box mt={4} textAlign="center">
            <IconButton
              aria-label="Previous Page"
              icon={<AiOutlineLeft />}
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
              mr={2}
              size="sm"
              color="black"
            />
            <Text as="span" mx={2} fontSize="sm" color='black'>
              {currentPage} / {totalPages}
            </Text>
            <IconButton
              aria-label="Next Page"
              icon={<AiOutlineRight />}
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              ml={2}
              size="sm"
              color="black"
            />
          </Box>
        </GridItem>

        <GridItem>
          <Box bg="white" p={4} borderRadius="md" boxShadow="md" _hover={{ boxShadow: 'lg' }}>
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="gray.600">
              Weather
            </Text>
            <WeatherForecastWidget />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NewsList;
