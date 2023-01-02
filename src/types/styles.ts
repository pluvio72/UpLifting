import {CSSProperties} from 'react';

export type Padding = {
  p?: CSSProperties['padding'];
  pt?: CSSProperties['paddingTop'];
  pr?: CSSProperties['paddingRight'];
  pb?: CSSProperties['paddingBottom'];
  pl?: CSSProperties['paddingLeft'];
  px?: CSSProperties['padding'];
  py?: CSSProperties['padding'];
};

export type Margin = {
  m?: CSSProperties['margin'];
  mt?: CSSProperties['marginTop'];
  mr?: CSSProperties['marginRight'];
  mb?: CSSProperties['marginBottom'];
  ml?: CSSProperties['marginLeft'];
  mx?: CSSProperties['margin'];
  my?: CSSProperties['margin'];
};
