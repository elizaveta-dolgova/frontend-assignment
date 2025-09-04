import {extendTheme} from '@chakra-ui/react';

const fontSizes = {
  heading: {
    1: '24px',
    2: '20px',
    3: '18px',
  },
  text: {
    base: '16px',
    small: '14px',
  },
};

const lineHeights = {
  heading: {
    1: '32px',
    2: '24px',
    3: '24px',
  },
  base: '24px',
  small: '20px',
};

const fontWeights = {
  heading: {
    1: 700,
    2: 600,
    3: 500,
  },
  text: {
    base: 400,
    alternative: 500,
  },
};

const textStyles = {
  heading: {
    1: {
      fontSize: 'heading.1',
      fontWeight: 'heading.1',
      lineHeight: 'heading.1',
    },
    2: {
      fontSize: 'heading.2',
      fontWeight: 'heading.2',
      lineHeight: 'heading.2',
    },
    3: {
      fontSize: 'heading.3',
      fontWeight: 'heading.3',
      lineHeight: 'heading.3',
    },
  },

  text: {
    base: {
      fontSize: 'text.base',
      fontWeight: 'text.base',
      lineHeight: 'base',
    },
    small: {
      fontSize: 'text.small',
      fontWeight: 'text.base',
      lineHeight: 'small',
    },
  },
};

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'text-primary': '#001141',
    'text-secondary': '#4D5667',
    'text-tertiary': '#7A869A',
    'text-white': '#FFFFFF',
    'text-danger': '#B71C1C',

    'fill-brand': '#0F62FE',
    'fill-brand-hover': '#0043CE',
    'fill-darkBlue': '#001141',
    'fill-gray': '#F1F2F6',
    'fill-gray-hover': '#E6E8EF',
    'fill-gray-lightest': '#F1F2F6',
    'fill-white': '#FFFFFF',

    'border-brand': '#0F62FE',
    'border-gray': '#CAD1DE',
    'border-danger': '#E32C1E',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '100px',
        fontSize: 'text.small',
      },
      variants: {
        primary: {
          bg: 'fill-brand',
          color: 'text-white',
          _hover: {
            bg: 'fill-brand-hover',
            _disabled: {
              bg: 'fill-brand',
            },
          },
        },
        secondary: {
          bg: 'fill-gray',
          color: 'text-primary',
          _hover: {
            bg: 'fill-gray-hover',
            _disabled: {
              bg: 'fill-gray',
            },
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    IconButton: {
      baseStyle: {
        borderRadius: '100px',
      },
      variants: {
        gray: {
          bg: 'fill-gray',
          color: 'text-primary',
          _hover: {
            bg: 'fill-gray-hover',
            _disabled: {
              bg: 'fill-gray',
            },
          },
        },
      },
      defaultProps: {
        variant: 'gray',
      },
    },
  },
  fontSizes,
  fontWeights,
  lineHeights,
  textStyles,
});

export default theme;
