import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import Icon from "react-native-vector-icons/FontAwesome5";
import { auth, database } from "../firebase/firebase.config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

import React from "react";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isPasswordShown, setPasswordShown] = useState(false);

  const [formError, setFormError] = useState({
    email: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const getUserData = async () => {
        try {
          const dataRef = ref(database, `Users/${user}`);
          const snapShot = await get(dataRef);

          if (snapShot.exists()) {
            console.log("user exist");
            const data = await snapShot.val();
            setFormData(data);
            console.log(`User : ${JSON.stringify(data)}`);
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      // getUserData();
    }, [user])
  );

  const handleFormError = (field, text) => {
    if (field === "email" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "enter valid email" },
      });
    } else {
      setFormError({ ...formError, ...{ [field]: "" } });
    }
  };
  const handleTextChange = (field, text) => {
    setFormData({ ...formData, ...{ [field]: text } });
    handleFormError(field, text);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isValidForm = async () => {
    var valid = true;

    if (!formData.email || !isValidEmail(formData.email)) {
      await handleFormError("email", "");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    if (await isValidForm()) {
      try {
        sendPasswordResetEmail(auth, formData.email);

        Alert.alert("Alert Title", "My Alert Msg", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(`input Data : ${JSON.stringify(formData)}`);
        setFormData({ email: "" });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("User upadtion error:", errorCode, errorMessage);
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
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <View>
              <Icon
                name="chevron-left"
                size={16}
                style={{ paddingVertical: 25 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={style.accountText}>CHANGE PASSWORD</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <Text style={{ color: COLORS.primary }}>Email</Text>
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
              placeholder="Enter your email"
              placeholderTextColor="#a3a3a3"
              onChangeText={(text) => handleTextChange("email", text)}
              value={formData.email}
            />
          </View>
          {formError.email && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.email}
              </Text>
            </View>
          )}

          <View style={{ marginVertical: 40 }}>
            <Button
              title="RESET PASSWORD"
              filled
              style={{ height: 50, width: "100%" }}
              onPress={handleSubmit}
            />
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

  itemContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },
});
export default ChangePassword;
