import { useState } from "react";
import COLORS from "../constants/colors";
const { View, Text, StyleSheet, TouchableOpacity } = require("react-native");
import Icon from "react-native-vector-icons/FontAwesome5";

const CategoryList = ({
  item,
  onPress,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [isFocus, setFocus] = useState(false);
  const handle = () => {
    onPress();
    if (!isFocus) {
      setSelectedCategories({ ...selectedCategories, ...{ [item]: item } });
    } else {
      setSelectedCategories({ ...selectedCategories, ...{ [item]: null } });
    }
    setFocus(!isFocus);
  };

  return (
    <TouchableOpacity
      style={[style.item, isFocus && style.foucusedItem]}
      onPress={handle}
    >
      <View>
        <Text style={isFocus && style.focusedText}>{item}</Text>
      </View>
      {isFocus && (
        <View>
          <Icon name="times" size={14} color={COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  item: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    height: 40,
    width: 107,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  foucusedItem: {
    backgroundColor: COLORS.primary,
  },
  focusedText: {
    color: COLORS.white,
  },
});

export default CategoryList;
