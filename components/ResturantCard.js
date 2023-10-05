const {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";

const MACDONALDS = require("../assets/images/Macdonalds.png");
const ResturantCard = ({ resturantDetail }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ResturantFoodList", {
          resturantDetail: resturantDetail,
        })
      }
    >
      <View style={style.container}>
        <Image source={MACDONALDS} style={style.img} />
        <Text>{resturantDetail.resturantName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 64,
    width: 64,
  },
});
export default ResturantCard;
