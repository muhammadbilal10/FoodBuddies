import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useState } from "react";
import { ref, set, get } from "firebase/database";
import Icon from "react-native-vector-icons/FontAwesome5";
import { database } from "../firebase/firebase.config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import ItemNotFound from "./ItemNotFound";

const OrdersHistory = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const staticOrderList = ["item", "item"];
  const [orderList, setOrderList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getOrderData = async () => {
        try {
          const dataRef = ref(database, `Order/${user}`);
          const snapShot = await get(dataRef);
          if (snapShot.exists()) {
            console.log("user exist");
            const data = await snapShot.val();
            setOrderList(Object.values(data));
            console.log(`User : ${JSON.stringify(data)}`);
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      getOrderData();
    }, [user])
  );

  const handleOrderDetails = async (item) => {
    console.log("button clicked");
    navigation.navigate("OrderDetails", { order: item });
  };

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View>
              <Icon
                name="chevron-left"
                size={16}
                style={{ paddingVertical: 25 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={style.heading}>ORDER HISTORY</Text>
        </View>
        {orderList.length !== 0 ? (
          <View style={{ marginVertical: 40, maxHeight: 500 }}>
            <FlatList
              data={orderList}
              renderItem={({ item }) => (
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{}}>
                      <Text style={{ color: COLORS.yellow, fontWeight: "600" }}>
                        {item.date}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ color: COLORS.yellow, fontWeight: "600" }}>
                        {item.totalPrice}
                      </Text>
                    </View>
                  </View>

                  <View style={{}}>
                    <Text
                      style={{
                        color: "#a3a3a3",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      {item.items.length} items
                    </Text>
                  </View>

                  <View style={{ marginVertical: 40 }}>
                    <Button
                      title="VIEW DETAILS"
                      style={{ height: 50, width: "100%", borderWidth: 2.5 }}
                      onPress={() => handleOrderDetails(item)}
                    />
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <ItemNotFound
            heading="NO ORDER HISTOY"
            statement="Try searching for items and adding them to your basket"
            icon="history"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },

  itemContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
});
export default OrdersHistory;
