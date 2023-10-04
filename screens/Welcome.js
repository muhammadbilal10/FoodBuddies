import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
const Logo = require("../assets/images/FoodBuddies.png");

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={style.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={style.container}>
        <View>
          <Image source={Logo} style={style.Logo} />
        </View>
      </View>
      <View style={{ ...style.container }}>
        <View>
          <Text style={[style.welText, { color: COLORS.primary }]}>
            Welcome!
          </Text>
        </View>
        <Button
          title="Sign in"
          filled={true}
          onPress={() => navigation.navigate("Login")}
        />
        <Button title="Sign up" onPress={() => navigation.navigate("Signup")} />
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  Logo: {
    height: 200,
    width: 270,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welText: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 600,
  },
});

export default Welcome;
