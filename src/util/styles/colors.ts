const colors = {
  white: '#fff',
  grey: 'rgb(227,228,227)',
  black: '#000',
  primary: '#2B2D42',
  secondary: '#8D99AE',
  light: '#EDF2F4',
  accent: '#EF233C',
  accentDark: '#D90429',
  shadowColor: 'rgb(30,30,30)',
  borderColor: '#111',
  green: 'rgb(20, 148, 30)',
  red: 'rgb(180, 34, 20)'
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
    return colors.light;
  } else {
    return colors.primary;
  }
};

export default colors;
