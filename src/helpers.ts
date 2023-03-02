// @ts-ignore-next-line
import { Dimensions } from 'react-native';

const scale = Dimensions.get('window').width / 1000;

export const scaleFont = (size:number) => {
  return Math.round(size * scale);
}