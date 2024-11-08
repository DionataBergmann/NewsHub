import FavoriteButton from '@/components/molecules/FavoriteButton';
import { Box, Grid, GridItem, Text, Link } from '@chakra-ui/react';

interface NewsItem {
  title: string;
  url?: string;
  urlToImage: string;
  publishedAt: string;
}

const NewsLayout = ({ news }: { selectedCategory: string; news: NewsItem[] }) => {

  const mainNews = news[0] || { title: 'Main News', url: '#', urlToImage: '', publishedAt: '' };
  const secondaryNews = news[1] || { title: 'Secondary News', url: '#', urlToImage: '', publishedAt: '' };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <Grid templateColumns={['1fr']} gap={4} p={4} maxW="80%" mx="auto">
      <GridItem>
        <Grid templateRows="auto" gap={4}>
          <Grid templateColumns="2fr 1fr" gap={4}>
            <GridItem>
              <Box
                bg="white"
                bgImage={mainNews?.urlToImage}
                p={6}
                borderRadius="md"
                boxShadow="md"
                h="100%"
                _hover={{ boxShadow: 'lg' }}
                minHeight="350px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                position="relative"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
              >
                <FavoriteButton newsItem={mainNews} />
                <Box
                  bg="rgba(0, 0, 0, 0.6)"
                  p={4}
                  width="100%"
                  position="absolute"
                  bottom={0}
                  left={0}
                >
                  <Text fontFamily="heading" fontSize="2xl" fontWeight="bold" color="white">
                    {mainNews.title}
                  </Text>
                  <Text fontFamily="body" fontSize="md" color="gray.300">
                    {new Date(mainNews?.publishedAt)?.toLocaleDateString('en-US', options)}
                  </Text>
                  <Link
                    color="blue.300"
                    position="absolute"
                    bottom={2}
                    right={4}
                    href={mainNews?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    textDecoration='underline'
                  >
                    Read More
                  </Link>
                </Box>
              </Box>
            </GridItem>

            <GridItem>
              <Box
                bg="white"
                bgImage={secondaryNews?.urlToImage}
                p={6}
                borderRadius="md"
                boxShadow="md"
                h="100%"
                _hover={{ boxShadow: 'lg' }}
                minHeight="350px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                position="relative"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
              >
                <FavoriteButton newsItem={secondaryNews} />
                <Box
                  bg="rgba(0, 0, 0, 0.6)"
                  p={4}
                  width="100%"
                  position="absolute"
                  bottom={0}
                  left={0}
                >
                  <Text fontFamily="heading" fontSize="xl" fontWeight="bold" color="white">
                    {secondaryNews.title}
                  </Text>
                  <Text fontFamily="body" fontSize="md" color="gray.300">
                    {new Date(secondaryNews?.publishedAt)?.toLocaleDateString('en-US', options)}
                  </Text>
                  <Link
                    color="blue.300"
                    position="absolute"
                    bottom={2}
                    right={4}
                    href={secondaryNews?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    textDecoration='underline'
                  >
                    Read More
                  </Link>
                </Box>
              </Box>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {news.slice(2, 5).map((item, index) => (
              <Box
                bg="white"
                bgImage={item?.urlToImage}
                p={6}
                borderRadius="md"
                boxShadow="md"
                h="100%"
                _hover={{ boxShadow: 'lg' }}
                minHeight="350px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                position="relative"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                key={index}
              >
                <FavoriteButton newsItem={item} /> 
                <Box
                  bg="rgba(0, 0, 0, 0.6)"
                  p={4}
                  width="100%"
                  position="absolute"
                  bottom={0}
                  left={0}
                >
                  <Text fontFamily="heading" fontSize="xl" fontWeight="bold" color="white">
                    {item.title}
                  </Text>
                  <Text fontFamily="body" fontSize="md" color="gray.300">
                    {new Date(item?.publishedAt)?.toLocaleDateString('en-US', options)}
                  </Text>
                  <Link
                    color="blue.300"
                    position="absolute"
                    bottom={2}
                    right={4}
                    href={item?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    textDecoration='underline'
                  >
                    Read More
                  </Link>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default NewsLayout;
