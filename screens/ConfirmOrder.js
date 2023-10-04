const { View, StyleSheet, Text, Image } = require("react-native");
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import COLORS from "../constants/colors";
const ConfirmationLogo = require("../assets/images/ConfirmationLogo.png");

const ConfirmOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={[style.container, { backgroundColor: "#4fe178" }]}>
      <View style={style.childContainer}>
        <View>
          <Text style={[style.header, { color: COLORS.white }]}>
            ORDER CONFIRMED!
          </Text>
        </View>
        <View>
          <Image source={ConfirmationLogo} />
        </View>

        <View>
          <Text style={style.text}>
            Hang on Tight! We’ve received your order and we’ll bring it to you
            ASAP!
          </Text>
        </View>
        <Button
          title="TRACK MY ORDER"
          style={{
            width: 335,
            height: 40,
            borderColor: "white",
          }}
          onPress={() => navigation.navigate("HomeTabs", { screen: "Home" })}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  childContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  img: {
    height: 157,
    width: 157,
  },
  header: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
export default ConfirmOrder;
