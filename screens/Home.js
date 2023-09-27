import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
const Logo = require("../assets/images/AppFoodLogo.png");

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient style={style.container} colors={[COLORS.white]}>
      <View style={style.container}>
        <View>
          <Image source={Logo} style={style.Logo} />
        </View>
      </View>
      <View style={style.container}>
        <View>
          <Text>Welcome</Text>
        </View>
        <Button
          title="Join Now"
          onPress={() => navigation.navigate("Signup")}
        />
        <Button
          title="Join Now"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  Logo: {
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
