const {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} = require("react-native");
import { useNavigation } from "@react-navigation/native";
import ItemCard from "../components/ItemCard";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";

const ResturantFoodList = ({ route }) => {
  const resturantDetail = route?.params?.resturantDetail;
  const navigation = useNavigation();
  const items = ["items", "items", "item", "item", "item"];

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = 100;
  const numColumns = Math.floor(SCREEN_WIDTH / ITEM_WIDTH);
  const list = [
    ...new Set(resturantDetail.foodList.map((item) => item.category)),
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("HomeTabs")}
        >
          <View>
            <Icon name="chevron-left" size={20} />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, paddingRight: 20, marginRight: 60 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {resturantDetail.resturantName}
          </Text>
        </View>
      </View>

      <FlatList
        data={resturantDetail.foodList}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            variation={item.variations}
            onPress={() => {
              navigation.navigate("AddToBasket", {
                item: {
                  ...item,
                  ...{
                    resturant: resturantDetail?.resturantName,
                  },
                },
                variations: item.variations,
              });
            }}
          />
        )}
        numColumns={numColumns}
      />
    </View>
  );
};

export default ResturantFoodList;
