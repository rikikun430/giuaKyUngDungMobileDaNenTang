/**
 * Example item component
 * @param style Object with pre-calculated values, looks like {position: 'absolute', zIndex: 3, width: Number, height: Number, top: Number, left: Number}
 * @param item One of items supplied to Timetable through 'items' property
 * @param dayIndex For multiday items inicates current day index
 * @param daysTotal For multiday items indicates total amount of days
 */
import { View, Text } from "react-native";

export default function ToDoItem({ style, item, dayIndex, daysTotal }) {
  return (
    <View
      style={{
        backgroundColor: item?.Color,
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        borderRadius: 10,
        elevation: 5,
        flexDirection: "Column",
        padding: 10
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{item?.title}</Text>
      <Text style={{ color: "white" }}>{item?.Content}</Text>
    </View>
  );
}
