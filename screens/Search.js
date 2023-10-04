const {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} = require("react-native");
import React from "react";
import COLORS from "../constants/colors";
import CategoryList from "../components/CategoryList";
import ItemCard from "../components/ItemCard";
import { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { database } from "../firebase/firebase.config";
import { get, ref } from "firebase/database";
import Icon from "react-native-vector-icons/FontAwesome5";

const Search = () => {
  const categories = [
    "Lunch",
    "Fastfood",
    "Breakfast",
    "South Indian",
    "NorthIndian",
    "Dinner",
  ];

  const [focus, setFocus] = useState(false);
  const [foodItem, setFooditem] = useState([]);
  const [showFoodItems, setShowFooditems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const numColumns = Math.floor(screenWidth / 157);

  useFocusEffect(
    React.useCallback(() => {
      const getBasketData = async () => {
        try {
          const dataRef = ref(database, `Foods`);
          const snapShot = await get(dataRef);
          if (snapShot.exists()) {
            const data = await snapShot.val();
            const fod = Object.values(data);

            setFooditem(Object.values(data));
            setShowFooditems(Object.values(data));

            setFoodCategory(fod.map((item) => item.category));
            console.log(Object.values(data));
          } else {
            console.log("Data not exist");
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      getBasketData();
    }, [])
  );

  return (
    <View style={style.constainer}>
      <View style={{ marginHorizontal: 16 }}>
        <View>
          <Text style={style.inputLable}>SEARCH</Text>
        </View>
        <View>
          <TextInput
            style={style.inputField}
            placeholder="Search"
            placeholderTextColor="#a3a3a3"
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            onPress={() => {
              const list = foodItem.filter(
                (item) =>
                  item?.title?.toLowerCase().includes(search.toLowerCase()) ||
                  search.toLowerCase().includes(item.title.toLowerCase())
              );

              console.log(`Show list item : ${JSON.stringify(list)}`);
              setShowFooditems(list);
            }}
            onBlur={() => setShowFooditems(foodItem)}
          >
            <Icon
              style={{ position: "absolute", right: 12, bottom: 12 }}
              name="search"
              size={16}
              color="#a3a3a3"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View>
          <Text style={style.inputLable}>CATEGORIES</Text>
        </View>

        <ScrollView scrollEnabled={true}>
          <View style={style.listContainer}>
            <FlatList
              data={foodCategory}
              renderItem={({ item }) => (
                <CategoryList
                  item={item}
                  onPress={() =>
                    console.log(
                      `category pressed ${JSON.stringify(selectedCategories)}`
                    )
                  }
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </ScrollView>

        {showFoodItems && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ width: "100%", maxHeight: 400 }}
          >
            <View style={{ alignItems: "center" }}>
              <FlatList
                data={showFoodItems}
                renderItem={({ item }) => (
                  <ItemCard
                    item={item}
                    variation={item.variations}
                    onPress={() => {
                      console.log(
                        `Varities after press ${JSON.stringify(item)}`
                      );
                      navigation.navigate("AddToBasket", {
                        item: item,
                        variations: item.variations,
                      });
                    }}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
              <View>
                <Text
                  style={{
                    color: "#a3a3a3",
                    marginVertical: 30,
                    paddingVertical: 30,
                  }}
                >
                  You’ve reached the end of the list
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 60,
  },
  inputField: {
    borderRadius: 20,
    height: 40,
    backgroundColor: "#f4f4f4",
    paddingLeft: 20,
  },
  inputLable: {
    color: COLORS.primary,
    paddingLeft: 20,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 15,
  },
});

export default Search;
