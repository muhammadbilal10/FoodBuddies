const {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} = require("react-native");
import Burger from "../assets/images/Burger.jpg";
import Icon from "react-native-vector-icons/FontAwesome5";
import COLORS from "../constants/colors";

const ItemCard = ({ item, onPress, variation }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <View>
          <Image source={item?.img_url} style={style.img} />
        </View>

        <View>
          <Text style={style.heading2}>{item?.title}</Text>
        </View>

        <View style={style.childContainer}>
          <View>
            <Text style={style.heading}>$ {variation[0]?.price}</Text>
          </View>
          <View>
            <Icon name="shopping-basket" size={20} color={COLORS.primary} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 230,
    width: "auto",
    maxWidth: 157,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  childContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    flex: 1,
    alignItems: "center",
  },
  img: {
    height: 157,
    width: 157,

    borderRadius: 10,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  heading2: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
});

export default ItemCard;
