import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const Button = (props) => {
  const filledBackgroundColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBackgroundColor : outlinedColor;
  const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      style={{
        ...style.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 12, color: textColor, fontWeight: "bold" }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 30,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: "10px",
  },
});
export default Button;
