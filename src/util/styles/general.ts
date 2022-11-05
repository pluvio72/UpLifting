import { StyleSheet } from "react-native";
import { Margin, Padding } from "../../types/styles";
import colors from "./colors";

export const PaddingStylesheet = (padding?: Padding) => padding ? ({
  padding: padding.p,
  paddingHorizontal: padding.px,
  paddingVertical: padding.py,
  paddingTop: padding.pt,
  paddingRight: padding.pr,
  paddingBottom: padding.pb,
  paddingLeft: padding.pl,
}) : {};

export const MarginStylesheet = (margin?: Margin) => margin ? ({
  margin: margin.m,
  marginHorizontal: margin.mx,
  marginVertical: margin.my,
  marginTop: margin.mt,
  marginRight: margin.mr,
  marginBottom: margin.mb,
  marginLeft: margin.ml,
}) : {};

const GeneralStyles = StyleSheet.create({
  dropShadow: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  container: {
    padding: 10
  },
  textBold: {
    fontWeight: '600'
  },
  textMd: {
    fontSize: 16,
  },
  textCenter: {
    textAlign: 'center'
  },
  textLg: {
    fontSize: 20,
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  w50: {
    width: '50%',
  },
  h50: {
    height: '50%'
  }
});

export default GeneralStyles;