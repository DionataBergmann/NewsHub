import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
    heading: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.100',
        color: 'white',
      },
    },
  },
});

export default customTheme;
