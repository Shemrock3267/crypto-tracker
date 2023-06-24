import { themeColors } from '../constants/styles';

export const getPerfomanceColor = (priceChange: number) => {
  if(priceChange < 0) return themeColors['DECLINE_COLOR'];
  return themeColors['GROWTH_COLOR'];
};
