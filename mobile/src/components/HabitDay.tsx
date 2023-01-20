import {
   TouchableOpacity,
   TouchableOpacityProps,
   Dimensions,
} from "react-native";

const WEEK_DAYS = 7;

const SCREN_HORZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
   Dimensions.get("screen").width / WEEK_DAYS - (SCREN_HORZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {}

export function HabitDay({ ...rest }: Props) {
   return (
      <TouchableOpacity
         {...rest}
         activeOpacity={0.7}
         className="bg-zinc-900 border-2 m-1 border-zinc-800 rounded-lg"
         style={{ width: DAY_SIZE, height: DAY_SIZE }}
      />
   );
}
