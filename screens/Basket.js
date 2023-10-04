const {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} = require("react-native");
import React from "react";
const FoodItem = require("../assets/images/Burger.jpg");
import Icon from "react-native-vector-icons/FontAwesome5";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import BasketCard from "../components/BasketCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { database } from "../firebase/firebase.config";
import { useAuth } from "../contexts/AuthContext";
import ItemNotFound from "./ItemNotFound";

const Basket = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params?.basketItem;
  const { user } = useAuth();
  const [basketData, setBasketData] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const itemList = [
    {
      name: "Egg Salad",
    },
    {
      name: "Grilled Salmon",
    },
    {
      name: "Grilled Salmon",
    },
    {
      name: "Grilled Salmon",
    },
    {
      name: "Grilled Salmo",
    },
  ];

  console.log("basket called");
  useFocusEffect(
    React.useCallback(() => {
      const getBasketData = async () => {
        try {
          const dataRef = ref(database, `Basket/${user}`);
          const snapShot = await get(dataRef);

          if (snapShot.exists()) {
            const data = await snapShot.val();
            setBasketData(() => Object.values(data));
            const bd = Object.values(data);
            setTotalPrice(
              bd.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.price * currentItem.quantity;
              }, 0)
            );
            setShowContent(true);
            console.log(Object.values(data));
          } else {
            setBasketData([]);
            setShowContent(false);
          }
          console.log("this function also called every time");
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      getBasketData();
      console.log("useffect also called");
    }, [user])
  );

  const handleBasket = async (key) => {
    try {
      const dataRef = ref(database, `Basket/${user}/${key}`);
      const bdata = basketData;
      const snapShot = await get(dataRef);

      await remove(dataRef).then(() => {
        console.log("Data deleted");

        setBasketData((prevBasketData) =>
          prevBasketData.filter((item) => item._id !== key)
        );
        const pr = basketData.filter((item) => item._id !== key);
        setTotalPrice(
          pr.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.quantity;
          }, 0)
        );
        console.log(bdata.length > 1 ? true : false);
        console.log(JSON.stringify(bdata));
        setShowContent(bdata.length > 1 ? true : false);
      });
    } catch (error) {
      console.error(`Error deleting Basket Data: ${error}`);
    }
  };

  console.log(`Basket Data : ${JSON.stringify(basketData)}`);

  const handleProceed = () => {
    const order = { items: basketData, totalPrice: totalPrice.toFixed(2) };
    navigation.navigate("Checkout", { orderDetail: order });
  };
  return (
    <View
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View>
        <Text style={style.header}>BASKET</Text>
      </View>

      {!showContent ? (
        <ItemNotFound
          heading="Basket Emtpy"
          statement="Try searching for items and adding them to your basket"
          icon="shopping-basket"
        />
      ) : (
        <FlatList
          data={basketData}
          renderItem={({ item }) => (
            <BasketCard item={item} onPress={() => handleBasket(item._id)} />
          )}
        />
      )}

      {showContent && (
        <View style={style.bottomContent}>
          <View>
            <Text style={style.itemTotal}>TOTAL</Text>
          </View>
          <View>
            <Text style={[style.subHeader, { color: "#f99928" }]}>
              $ {totalPrice.toFixed(2)}
            </Text>
          </View>

          <Button
            title="Proceed to checkout"
            filled
            style={{ height: 40, width: "auto", marginTop: 10 }}
            onPress={() => handleProceed()}
          />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
  },

  subHeader: {
    fontSize: 24,
    fontWeight: "700",
  },

  itemTotal: {
    fontFamily: "Body",
    fontSize: 18,
    fontWeight: "500",
  },

  bottomContent: {
    height: 150,
    justifyContent: "space-evenly",
  },
});

export default Basket;
