const { View, Text, StyleSheet } = require("react-native");
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";

const ItemNotFound = ({ heading, statement }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Icon name="search" color="#C7C7C7" size={70} style={styles.icon} />
      </View>

      <View>
        <Text style={styles.heading}>{heading}</Text>
      </View>

      <View>
        <Text style={styles.subHeading}>
          {/* Try Searching the item with a different keyword */}
          {statement}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  heading: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subHeading: {
    fontSize: 13,
    width: 218,
    textAlign: "center",
  },

  icon: {
    marginRight: 12,
  },
});
export default ItemNotFound;
