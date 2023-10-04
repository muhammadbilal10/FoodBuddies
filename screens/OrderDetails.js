import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();
  const order = route?.params?.order;

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrdersHistory")}
          >
            <View>
              <Icon
                name="chevron-left"
                size={16}
                style={{ paddingVertical: 25 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={style.heading}>{order.date}</Text>
          <Text
            style={{ color: COLORS.primary, fontSize: 25, fontWeight: "700" }}
          >
            $ {order.totalPrice}
          </Text>
        </View>

        <View style={{ marginVertical: 40, maxHeight: 400 }}>
          <FlatList
            data={order.items}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 15 }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        color: "#a3a3a3",
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      {item.quantity} PIECES
                    </Text>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        color: "#a3a3a3",
                        fontWeight: "600",
                        fontSize: 20,
                      }}
                    >
                      $ {(item.quantity * item.price).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
export default OrderDetails;
