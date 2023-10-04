const { View, Text, StyleSheet, Image } = require("react-native");
const MACDONALDS = require("../assets/images/Macdonalds.png");
const ResturantCard = () => {
  return (
    <View style={style.container}>
      <Image source={MACDONALDS} style={style.img} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 64,
    width: 64,
  },
});
export default ResturantCard;
