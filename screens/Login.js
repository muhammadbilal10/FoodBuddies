import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Ionicons } from "@expo/vector-icons";

import { auth, database } from "../firebase/firebase.config";
import { useAuth } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";

import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref } from "firebase/database";

const Login = () => {
  const navigation = useNavigation();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [isPasswordShown, setPasswordShown] = useState(false);
  const [isPress, setPress] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const handleFormError = (field, text) => {
    if (field === "email" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "please enter valid email address" },
      });
    } else if (field === "mobileNumber" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "please enter valid mobile number" },
      });
    } else if (field === "password" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "password length at least 6 character" },
      });
    } else {
      setFormError({ ...formError, ...{ [field]: "" } });
    }
  };
  const handleTextChange = (field, text) => {
    setFormData({ ...formData, ...{ [field]: text } });
    handleFormError(field, text);
  };

  const isValidForm = async () => {
    var valid = true;
    if (!formData.password || formData.password.length < 6) {
      await handleFormError("password", "");
      valid = false;
    }
    if (!isValidEmail(formData.email)) {
      handleFormError("email", "");
      valid = false;
    }
    return valid;
  };
  const handleSubmit = async () => {
    try {
      if (await isValidForm()) {
        console.log(`form Data ${JSON.stringify(formData)}`);
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userData = userCredentials.user;
        let userInfo = {};
        const userRef = ref(database, `Users/${userData.uid}`);
        const snapShot = await get(userRef);
        if (snapShot.exists()) {
          userInfo = snapShot.val();
        }
        if (userData.emailVerified) {
          loginUser(userData.uid);
          console.log(`before navigation : ${JSON.stringify(userData)}`);
          navigation.navigate("HomeTabs", { user: userInfo });
        } else {
          console.log("sign failed");
        }

        // Toast.show({
        //   type: "error",
        //   text1: "sign in failed",
        //   text2: errorMessage,
        //   position: "bottom",
        // });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("User creation error:", errorCode, errorMessage);
      Toast.show({
        type: "error",
        text1: "sign in failed",
        text2: errorMessage,
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={{ flex: 1, marginHorizontal: 17 }}>
        <View style={{ marginVertical: 22 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <View>
              <Icon name="times" size={16} style={{ paddingVertical: 25 }} />
            </View>
          </TouchableOpacity>
          <Text style={style.accountText}>LOGIN</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ marginHorizontal: 4, marginBottom: 8 }}>
            <Text style={style.text}>EMAIL</Text>
          </View>
          <View style={{ height: 48 }}>
            <TextInput
              style={[style.inputField]}
              onChangeText={(text) => handleTextChange("email", text)}
              placeholder="Enter your email"
              placeholderTextColor="#a3a3a3"
              onFocus={() => {
                setPress(!isPress);
                console.log(isPress);
              }}
              onBlur={() => {
                setPress(!isPress);
                console.log(isPress);
              }}
            />
          </View>
          {formError.email && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.email}
              </Text>
            </View>
          )}

          <View style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Text style={style.text}>Password</Text>
          </View>
          <View
            style={{
              ...{
                height: 48,
                paddingLeft: 0,
              },
            }}
          >
            <TextInput
              style={{
                ...style.inputField,
                ...{
                  height: "100%",
                  paddingLeft: 16,
                },
              }}
              secureTextEntry={!isPasswordShown}
              placeholder="Enter your password"
              placeholderTextColor="#a3a3a3"
              onChangeText={(text) => handleTextChange("password", text)}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 12, marginVertical: 12 }}
              onPress={() => setPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={22} color={COLORS.primary} />
              ) : (
                <Ionicons name="eye" size={22} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          </View>
          {formError.password && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.password}
              </Text>
            </View>
          )}
          <View style={{ marginVertical: 40 }}>
            <Button
              title="LOGIN"
              filled
              style={{ height: 50, width: "100%" }}
              onPress={handleSubmit}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#a3a3a3",
                  paddingTop: 20,
                }}
              >
                Don’t have an account?{" "}
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <View>
                    <Text style={{ color: COLORS.yellow }}> Register</Text>
                  </View>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  accountText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  email: {
    fontSize: 16,
    fontWeight: 400,
    marginVertical: 8,
  },

  inputField: {
    width: "100%",
    borderColor: COLORS.black,
    borderRadius: 20,
    height: 48,
    // borderWidth: 1,
    justifyContent: "center",
    height: "100%",
    paddingLeft: 16,
    backgroundColor: "#f4f4f4",
  },

  text: { color: COLORS.primary, fontWeight: "600" },
});
export default Login;
