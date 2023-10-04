const {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
  ScrollView,
} = require("react-native");
const Burger = require("../assets/images/Burger.jpg");
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase.config";
import { useAuth } from "../contexts/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const AddToBasket = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  const variation = route?.params?.variations;
  const { user } = useAuth();
  console.log(`Fetched Item: ${JSON.stringify(item)}`);
  console.log(`Fetched Item: ${user}`);
  const [count, setCount] = useState(1);
  const [selectedItem, setSelectedItem] = useState(variation[0].title);
  const [selectedItemPrice, setSelectedItemPrice] = useState(
    variation[0].price
  );

  const storeBasketData = async (basketData) => {
    try {
      const dataRef = ref(database, `Basket/${user}/${item._id}`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const itemData = snapshot.val();
        set(dataRef, {
          ...item,
          quantity: itemData.quantity + 1,
          price: selectedItemPrice,
        });
      } else {
        console.log("setting data");
        set(dataRef, {
          ...item,
          quantity: count,
          price: selectedItemPrice,
        });
      }
    } catch (error) {
      console.log(`Error storing basket data to local storage ${error}`);
    }
  };

  const handleBasket = async (item) => {
    storeBasketData(item);
    // navigation.navigate("Basket", { basketItem: item });
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: COLORS.white,
        }}
      >
        <View>
          <View>
            <Image source={item.img_url} style={styles.image} />
          </View>

          <View style={styles.middleContainer}>
            <View
              style={[
                styles.container,
                { marginVertical: 5, alignItems: "center" },
              ]}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Icon name="clock-o" color="#f99928" size={20} />
            </View>

            <View style={styles.container}>
              <Text style={{ color: "#f99928" }}>{item.resturant}</Text>
              <Text style={{ color: "#f99928" }}>34 mins</Text>
            </View>

            <View>
              <Text style={[styles.subHeaderText, { marginVertical: 12 }]}>
                Description
              </Text>
            </View>

            <View>
              <Text
                style={{ color: "#aeaeae", fontFamily: "Body", lineHeight: 20 }}
              >
                Non odit iusto delectus maxime sit placeat voluptatum dolorem.
                Dolores quos rerum iusto. Beatae totam ab veritatis aliquid
                tenetur qui ut. Quia ut dolorum enim et. Exercitationem
                occaecati eum est ex qui harum aliquam.
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={[styles.middleContainer, { paddingTop: 0 }]}>
            <View
              style={{ flex: 1, justifyContent: "center", marginBottom: 10 }}
            >
              <Text style={{ marginVertical: 5 }}>Choose an option:</Text>
              <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue) => setSelectedItem(itemValue)}
                style={{
                  width: "100%",
                  borderRadius: 20,
                  height: 48,
                  // borderWidth: 1,
                  justifyContent: "center",
                  height: "100%",
                  paddingLeft: 16,
                  paddingVertical: 8,
                  backgroundColor: "#f4f4f4",
                }}
              >
                {variation.map((option, index) => (
                  <Picker.Item
                    label={option.title}
                    value={option.title}
                    key={index}
                  />
                ))}
              </Picker>
              {/* <Text>Selected Option: {selectedItem}</Text> */}
            </View>

            <View style={[styles.container, { paddingVertical: 5 }]}>
              <Text
                style={[
                  styles.subHeaderText,
                  { color: COLORS.primary, marginLeft: 15 },
                ]}
              >
                QUANTITY
              </Text>
              <Text style={styles.subHeaderText}>SUBTOTAL</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.IconValueContainer}>
                <View>
                  <Text>{count}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (count > 1) {
                        setCount((count) => count - 1);
                      }
                    }}
                  >
                    <Icon name="minus" color={COLORS.primary} size={16} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCount((count) => count + 1);
                    }}
                  >
                    <Icon
                      name="plus"
                      color={COLORS.primary}
                      size={16}
                      style={{ marginLeft: 15 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.container}>
                <View>
                  <Text style={[styles.headerText, { color: COLORS.primary }]}>
                    $ {(selectedItemPrice * count).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title="ADD TO BASKET"
              filled
              style={{ width: "auto", height: 40, marginVertical: 24 }}
              onPress={() => handleBasket(item)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  middleContainer: { paddingHorizontal: 12, paddingVertical: 20 },

  image: {
    height: 220,
    width: "auto",
    backgroundColor: "black",
  },

  IconValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e2e2e2",
    height: 40,
    width: 157,
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subHeaderText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AddToBasket;
