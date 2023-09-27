import { Text, View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
