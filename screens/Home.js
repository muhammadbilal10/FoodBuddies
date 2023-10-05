import BasketCard from "../components/BasketCard";
import ItemCard from "../components/ItemCard";
import COLORS from "../constants/colors";
import ResturantCard from "../components/ResturantCard";
import { useEffect, useState } from "react";
const {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} = require("react-native");

import { ref, get, set } from "firebase/database";
import { auth, database } from "../firebase/firebase.config";
import { useNavigation } from "@react-navigation/native";
const Home = ({ route }) => {
  const item = ["item1", "item1", "item1", "item1", "item1"];
  const [foodItems, setFoodItems] = useState({});
  const [resturantList, setResturantList] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = route?.params?.user;
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const Resturant = (foodList) => {
    const separatedFoodByRestaurant = foodList.reduce((acc, foodItem) => {
      const { resturant, ...restFood } = foodItem;
      if (!acc[resturant]) {
        acc[resturant] = {
          resturantName: resturant,
          foodList: [],
        };
      }
      acc[resturant].foodList.push(restFood);
      return acc;
    }, {});

    const restaurantArray = Object.values(separatedFoodByRestaurant);
    setResturantList(restaurantArray);
    return restaurantArray;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsRef = ref(database, "Foods");
        const snapShot = await get(foodsRef);
        if (snapShot.exists()) {
          const data = snapShot.val();
          const itemList = Object.values(data);

          Resturant(itemList);
          setFoodItems(Object.values(data));
          console.log(`Fetched data ${JSON.stringify(filterItem)}`);
        } else {
          console.log("No Data Available");
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetching Data Error: ", error);
        setLoading(false);
      }
    };
    setName(user?.name);
    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={style.container}
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <View>
          <Text
            style={[style.text1, { color: COLORS.black, marginVertical: 20 }]}
          >
            Hello, <Text style={style.text1}>{name}</Text>
          </Text>
        </View>

        <View style={style.offerContainer}>
          <View>
            <Text style={style.text3}>
              GET{" "}
              <Text style={[style.text2, { color: COLORS.black }]}>50%</Text>
              AS A JOINING BONUS
            </Text>
          </View>

          <View>
            <Text style={[style.text3, { fontSize: 12, fontFamily: "Body" }]}>
              USE CODE ON CHECKOUT
            </Text>
            <Text style={[style.text2]}>NEW50</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={{ fontWeight: "500" }}>RECOMENDED FOR YOU</Text>
          </View>
          {!loading && (
            <FlatList
              data={foodItems}
              renderItem={({ item }) => (
                <ItemCard
                  item={item}
                  variation={item.variations}
                  onPress={() => {
                    console.log(
                      `Varities after press ${JSON.stringify(item.variations)}`
                    );
                    navigation.navigate("AddToBasket", {
                      item: item,
                      variations: item.variations,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View>
          <View>
            <Text style={{ fontWeight: "500" }}>RESTURANTS</Text>
          </View>

          <FlatList
            data={resturantList}
            renderItem={(item) => <ResturantCard resturantDetail={item.item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },

  text1: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 500,
  },
  text2: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text3: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },

  offerContainer: {
    height: 150,
    width: "auto",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    justifyContent: "space-between",
  },
});

export default Home;
