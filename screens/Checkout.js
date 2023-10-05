const { View, StyleSheet, Text, TouchableOpacity } = require("react-native");
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { child, get, ref, remove, set } from "firebase/database";
import { database } from "../firebase/firebase.config";
import { useAuth } from "../contexts/AuthContext";

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const orderDetail = route?.params?.orderDetail;
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleConfirm = async () => {
    try {
      const currentDate = new Date();
      const date = String(currentDate.getDate()).padStart(2, 0);
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      const order = {
        ...orderDetail,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        date: `${date} ${months[month]} ${year}`,
      };

      const dataRef = await ref(database, `Order/${user}`);
      const snapShot = await get(dataRef);
      if (snapShot.exists()) {
        const existingOrders = snapShot.val();
        const orderKeys = Object.keys(existingOrders);
        const newOrderId = `order_${orderKeys.length + 1}`;
        existingOrders[newOrderId] = order;
        await set(dataRef, existingOrders).then(() => {
          console.log("Order added");
        });
      } else {
        const newOrderList = {
          order_1: order,
        };
        await set(dataRef, newOrderList).then(() => {
          console.log("Order added");
        });
      }
      navigation.navigate("ConfirmPayment");
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }

    // navigation.navigate("ConfirmOrder");
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeTabs", { screen: "Basket" })}
      >
        <View>
          <Icon name="chevron-left" size={18} style={style.icon} />
        </View>
      </TouchableOpacity>

      <View>
        <Text
          style={[style.header, { marginVertical: 20, fontFamily: "Heading" }]}
        >
          CHECKOUT
        </Text>
      </View>

      <View style={style.childContainer1}>
        <View style={style.bottomContainer}>
          <View>
            <View>
              <Text style={style.subHeader}>Price</Text>
            </View>

            <View>
              <Text style={[style.header, { color: COLORS.primary }]}>
                $ {orderDetail?.totalPrice}
              </Text>
            </View>
          </View>

          <View>
            <View>
              <View>
                <Text style={style.subHeader}>DELIVER TO</Text>
              </View>
            </View>

            <View style={style.childContainer2}>
              <View>
                <Text style={style.subHeader2}>HOME</Text>
              </View>
              <View>
                <Text style={[style.subHeader2, { color: COLORS.yellow }]}>
                  change
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View>
              <View>
                <Text style={style.subHeader}>PAYMENT METHOD</Text>
              </View>
            </View>

            <View style={style.childContainer2}>
              <View>
                <Text style={style.subHeader2}>XXXX XXXX XXXX 2538</Text>
              </View>
              <View>
                <Text style={[style.subHeader2, { color: COLORS.yellow }]}>
                  change
                </Text>
              </View>
            </View>
          </View>

          <Button
            title="CONFRIM ORDER"
            filled
            style={{ width: "auto", height: 40 }}
            onPress={() => handleConfirm()}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },

  childContainer1: { flex: 1, justifyContent: "flex-end" },

  childContainer2: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  header: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subHeader: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Body",
  },

  subHeader2: {
    fontSize: 18,
    fontWeight: "500",
  },

  icon: {
    marginVertical: 20,
  },
});
export default Checkout;
