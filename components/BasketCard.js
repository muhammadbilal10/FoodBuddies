const {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} = require("react-native");
const FoodItem = require("../assets/images/Burger.jpg");
import Icon from "react-native-vector-icons/FontAwesome5";
import COLORS from "../constants/colors";

const BasketCard = ({ item, onPress }) => {
  return (
    <View
      style={[
        style.container,
        { marginVertical: 30, backgroundColor: COLORS.white },
      ]}
    >
      <View>
        <Image source={FoodItem} style={style.img} />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <View style={[style.cardContainer, { alignItems: "flex-start" }]}>
          <View>
            <Text style={style.itemName}>{item.title}</Text>
          </View>
          <View>
            <Text style={[style.subHeader, { color: COLORS.primary }]}>
              $ {item.quantity * item.price}
            </Text>
          </View>
        </View>

        <View style={style.cardContainer}>
          <TouchableOpacity onPress={onPress}>
            <View style={style.Icon}>
              <Icon name="trash" color={COLORS.white} size={15} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{}}>{item.quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cardContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },

  Icon: {
    backgroundColor: "#f77272",
    height: 22,
    width: 22,
    alignItems: "center",
    borderRadius: 4,
    justifyContent: "center",
  },

  header: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subHeader: {
    fontSize: 24,
    fontWeight: "700",
  },

  itemName: {
    fontFamily: "Body",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default BasketCard;
