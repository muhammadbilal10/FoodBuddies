import React, { useState } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

const Variaties = ({ varieties }) => {
  const [selectedItem, setSelectedItem] = useState(varieties);

  console.log(`Varities: ${varieties}`);
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  picker: {
    width: 200,
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
  },
});

export default Variaties;
