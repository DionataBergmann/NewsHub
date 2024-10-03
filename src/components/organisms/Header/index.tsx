import { Box, Input, Button, Flex, Spacer, InputGroup, InputRightElement, PopoverTrigger, Popover, PopoverCloseButton, PopoverHeader, PopoverContent, PopoverArrow, PopoverBody } from '@chakra-ui/react';
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import AudioPlayer from '../AudioPlayer/index';

const Header = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const handleGenerateClick = () => {
    setShowAudioPlayer(showAudioPlayer ? false : true);
  };

  return (
    <Box as="header" bg="black" p={4} boxShadow="lg" color="white">
      <Flex align="center" maxW="1200px" mx="auto" px={4} direction={['column', 'column', 'row']}>
        <Box fontSize={['xl', '2xl']} fontWeight="bold" mb={[4, 0]}>
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
            />
            <InputRightElement mr={2}>
              <AiOutlineSearch size="20px" color="gray" />
            </InputRightElement>
          </InputGroup>

          <Box ml={0}>
            <Popover trigger="hover" placement="right">
              <PopoverTrigger>
                <Button borderRadius="full" backgroundColor="white" color="gray.600" onClick={handleGenerateClick}>
                  Generate
                </Button>
              </PopoverTrigger>
              <PopoverContent color="black" bg="white" borderColor="gray.200" mt={2}>
                <PopoverArrow />
                <PopoverHeader >An audio will be generated using A.I. with a brief summary of the main news of the day based on the entered topic.</PopoverHeader>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        <Spacer />

        <Box display={['none', 'none', 'block']}>
          <Button leftIcon={<AiFillStar />} bgColor="yellow" variant="solid" borderRadius="md" size="md">
            Favorites
          </Button>
        </Box>
      </Flex>

      {showAudioPlayer && (
        <Box mt={0} display="flex" justifyContent="center">
          <AudioPlayer src="your-audio-file.mp3" />
        </Box>
      )}
    </Box>
  );
};

export default Header;
