import React, { useEffect } from "react";
import { ActivityIndicator, View, Text, useRou } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "firebase/auth";
import { useRoute } from "@react-navigation/native";

const EmailVerification = () => {
  // const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.data;

  console.log(JSON.stringify(user));

  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((user) => {
  //     if (user && user.emailVerified) {
  //       navigation.navigate("Login"); // Redirect to the login page
  //     }
  //   });

  //   // Don't forget to unsubscribe when the component unmounts
  //   unsubscribe();
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>Verifying your email...</Text>
    </View>
  );
};

export default EmailVerification;
