import { CardField, useStripe } from "@stripe/stripe-react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import creatPaymentIntent from "../api/stripeApis";
import React, { useState } from "react";
import Button from "../components/PaymentButton";
import { useNavigation } from "@react-navigation/native";
export default function PaymentScreen() {
  const { confirmPayment } = useStripe();
  const navigation = useNavigation();
  const [cardInfo, setCardInfo] = useState(null);

  const fetchCardDetail = (cardDetail) => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    let apiData = {
      amount: 500,
      currency: "USD",
    };

    try {
      const res = await creatPaymentIntent(apiData);
      console.log("payment intent create succesfully...!!!", res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          { paymentMethodType: "Card" }
        );
        console.log("confirmPaymentIntent res++++", confirmPaymentIntent);
        alert("Payment succesfully...!!!");
        navigation.navigate("ConfirmOrder");
      }
    } catch (error) {
      console.log("Error rasied during payment intent", error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
            fetchCardDetail(cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
        <Button onPress={onDone} disabled={!cardInfo} />
      </SafeAreaView>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
