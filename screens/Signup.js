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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { ref, set } from "firebase/database";

import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, database } from "../firebase/firebase.config";

import { useNavigation } from "@react-navigation/native";
const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobileNumber: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    name: "",
    mobileNumber: "",
    password: "",
  });

  const [isPasswordShown, setPasswordShown] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const handleFormError = (field, text) => {
    if (field === "name" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "please enter name" },
      });
    } else if (field === "email" && text === "") {
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
    if (!formData.mobileNumber) {
      handleFormError("mobileNumber", "");
      valid = false;
    }
    if (formError.name) {
      handleFormError("name", "");
      valid = false;
    }
    if (!isValidEmail(formData.email)) {
      handleFormError("email", "");
      valid = false;
    }

    console.log(valid);
    return valid;
  };
  const handleSubmit = async () => {
    console.log(`formerro data ${JSON.stringify(formData)}`);
    if (await isValidForm()) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredentials.user;
        await sendEmailVerification(user);
        const datref = await ref(database, `Users/${user.uid}`);
        const data = formData;
        delete data["password"];
        set(datref, data)
          .then(() => {
            console.log("data added succesfully");
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log("faild to add data");
          });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("User creation error:", errorCode, errorMessage);
      }
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          justifyContent: "space-evenly",
        }}
      >
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <View>
              <Icon name="times" size={16} style={{ paddingVertical: 25 }} />
            </View>
          </TouchableOpacity>
          <Text style={style.accountText}>REGISTER</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ marginHorizontal: 4, marginBottom: 8 }}>
            <Text style={{ color: COLORS.primary }}>EMAIL</Text>
          </View>
          <View style={{ height: 48 }}>
            <TextInput
              style={{
                ...style.inputField,
              }}
              onChangeText={(text) => handleTextChange("email", text)}
              placeholder="Enter your email"
              placeholderTextColor="#a3a3a3"
            />
          </View>

          {formError.email && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.email}
              </Text>
            </View>
          )}

          <View
            style={{ marginHorizontal: 4, marginBottom: 8, paddingTop: 10 }}
          >
            <Text style={{ color: COLORS.primary }}>NAME</Text>
          </View>
          <View style={{ height: 48 }}>
            <TextInput
              style={{
                ...style.inputField,
              }}
              onChangeText={(text) => handleTextChange("name", text)}
              placeholder="Enter your name"
              placeholderTextColor="#a3a3a3"
            />
          </View>
          {formError.name && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.name}
              </Text>
            </View>
          )}

          <View style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Text style={{ color: COLORS.primary }}>MOBILE NUMBER</Text>
          </View>
          <View style={{ flexDirection: "row", height: 48 }}>
            <TextInput
              style={{
                ...style.inputField,
              }}
              placeholder="Enter your Mobile Number"
              placeholderTextColor="#a3a3a3"
              keyboardType="numeric"
              onChangeText={(text) => handleTextChange("mobileNumber", text)}
            />
          </View>
          {formError.mobileNumber && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.mobileNumber}
              </Text>
            </View>
          )}
          <View style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Text style={{ color: COLORS.primary }}>Password</Text>
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
              title="Sign up"
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
                Already have an account?{" "}
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <View>
                    <Text style={{ color: COLORS.yellow }}> Login</Text>
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
});
export default Signup;
