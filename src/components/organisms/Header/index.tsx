import { Box, Input, Button, IconButton, Flex, Spacer, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai';  

const Header = () => {
  return (
    <Box as="header" bg="black" p={4} boxShadow="lg" color="white">
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        direction={['column', 'column', 'row']}  
      >
        <Box fontSize={['xl', '2xl']} fontWeight="bold" mb={[4, 0]}>
          NewsHub
        </Box>

        <Spacer />

        <Flex w={['100%', '100%', '40%']} mb={[4, 0]} align="center">
          <InputGroup>
            <Input
              placeholder="Pesquisar notícias..."
              bg="white"
              color="black"
              _placeholder={{ color: 'gray.500' }}
              borderRadius="md"
              size="md"
              flex="1"
              mr={2}
            />
            <InputRightElement mr={2}>
              <AiOutlineSearch size='20px' color="gray" />
            </InputRightElement>
          </InputGroup>

          <Box display={['block', 'block', 'none']}>
            <IconButton
              aria-label="Favoritas"
              icon={<AiFillStar />}
              colorScheme="yellow"
              borderRadius="md"
              size="md"
            />
          </Box>
        </Flex>

        <Spacer />

        <Box display={['none', 'none', 'block']}>
          <Button
            leftIcon={<AiFillStar />}
            colorScheme="yellow"
            variant="solid"
            borderRadius="md"
            size="md"
          >
            Favoritas
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
