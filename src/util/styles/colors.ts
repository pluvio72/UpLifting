const colors = {
  white: '#fff',
  grey: 'rgb(227,228,227)',
  black: '#000',
  primary: '#212529',
  secondary: '#adb5bd',
  accent: '#EF233C',
  accentDark: '#D90429',
  shadowColor: 'rgb(30,30,30)',
  borderColor: '#111',
  green: '#32CD32',
  red: 'rgb(180, 34, 20)',
  grey800: '#343a40',
  grey700: '#495057',
  grey600: '#6c757d',
  grey400: '#ced4da',
  grey300: '#dee2e6',
  grey200: '#e9ecef',
  grey100: '#EDF2F4',
} as const;

export type Color = typeof colors[keyof typeof colors];

export const getTextColor = (color: Color) => {
  if (
    color === colors.black ||
    color === colors.primary ||
    color === colors.secondary ||
    color === colors.accent ||
    color === colors.accentDark
  ) {
    return colors.grey100;
  } else {
    return colors.black;
  }
};

export default colors;
