import {extendTheme, NativeBaseProvider} from 'native-base';
import React, {PropsWithChildren} from 'react';

const overrides = extendTheme({
  colors: {
    primary: {
      50: '#edf7f4',
      100: '#edf7f4',
      200: '#cae7df',
      300: '#a7d7ca',
      400: '#84c7b4',
      500: '#61b89f',
      600: '#479e85',
      700: '#387b68',
      800: '#28584a',
      900: '#28584a',
    },
  },
  components: {
    Input: {
      baseStyle: {
        rounded: 'lg',
      },
      defaultProps: {
        size: 'lg',
        backgroundColor: 'gray.200',
        borderColor: 'transparent',
      },
    },
    Button: {
      baseStyle: {
        rounded: 'xl',
      },
      defaultProps: {
        _text: {
          fontWeight: '600',
          fontSize: 14,
        },
        size: 'sm',
      },
    },
  },
});

const Theme: React.FC<PropsWithChildren> = ({children}) => (
  <NativeBaseProvider theme={overrides}>{children}</NativeBaseProvider>
);

export default Theme;
