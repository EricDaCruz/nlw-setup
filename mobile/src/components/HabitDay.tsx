import { TouchableOpacity, Dimensions } from "react-native";

const WEEK_DAYS = 7;

const SCREN_HORZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS ) - (SCREN_HORZONTAL_PADDING + 5)

export function HabitDay() {
   return (
      <TouchableOpacity activeOpacity={0.7} className="bg-zinc-900 border-2 m-1 border-zinc-800 rounded-lg" style={{width: DAY_SIZE, height: DAY_SIZE}}/>
   );
}
