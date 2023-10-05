//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from "./PaymentScreen";

const ConfirmPayment = () => {
  const SP_KEY =
    "pk_test_51NxaYkEuDioAacdGmXiEb2Ranwfw2q4zflIaPl5hXwxg1ChZCmvlEf0250BGSK3myFVKocoDKMxQQKpgLFkm7S6Q00houEZl5z";

  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey={SP_KEY}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <PaymentScreen />
      </StripeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ConfirmPayment;
