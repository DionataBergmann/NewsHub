import { useState } from 'react';
import { Box, Input, InputGroup, InputRightElement, Text, Flex, Button } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import customTheme from '@/theme';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  onSelectCategory: (category: string) => void;
  onSearch: (value: string) => void; 
}

const categories = [
  'General',
  'Business',
  'Entertainment',
  'Health',
  'Science',
  'Sports',
  'Technology'
];

const CategoryCarousel = ({ onSelectCategory, onSearch }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);  
  };

  return (
    <Flex w="80%" mx="auto" alignItems="center" py={2} px={4} bg="gray.100" borderRadius="full" boxShadow="lg">
      <Swiper slidesPerView="auto" spaceBetween={8} freeMode={true} style={{ flex: 1 }}>
        {categories.map((category, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <Box
              bg={selectedCategory === category ? 'yellow' : 'white'}
              p={2}
              borderRadius="full"
              textAlign="center"
              minW="80px"
              boxShadow="sm"
              _hover={{ bg: 'gray.200', transition: '0.2s ease' }}
              onClick={() => handleCategoryClick(category)}
              cursor="pointer"
            >
              <Text fontSize="sm" fontWeight="bold" color={selectedCategory === category ? 'black' : 'gray.700'}>
                {category}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <InputGroup ml={4} maxW="800px">
        <Input
          placeholder="Search news..."
          bg="white"
          color="black"
          _placeholder={{ color: 'gray.500' }}
          borderRadius="full"
          size="md"
          border="1px solid lightgray"
          onChange={(e) => onSearch(e.target.value)}  
        />
        <InputRightElement>
          <Button bg="transparent" _hover={{ bg: 'transparent' }} size='sm'>
            <AiOutlineSearch size='xl' color="gray" />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default CategoryCarousel;
