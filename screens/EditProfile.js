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
import { ref, set, get } from "firebase/database";
import Icon from "react-native-vector-icons/FontAwesome5";
import { database } from "../firebase/firebase.config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

const EditProfile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    mobileNumber: "",
  });

  const [formError, setFormError] = useState({
    name: "",
    mobileNumber: "",
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
      getUserData();
    }, [user])
  );

  const handleFormError = (field, text) => {
    if (field === "name" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "please enter name" },
      });
    } else if (field === "mobileNumber" && text === "") {
      setFormError({
        ...formError,
        ...{ [field]: "mobile number lenght must be 11" },
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

    if (formError.name) {
      handleFormError("name", "");
      valid = false;
    }
    if (!formData.mobileNumber || formData.mobileNumber.length < 11) {
      handleFormError("mobileNumber", "");
      valid = false;
    }
    return valid;
  };
  const handleSubmit = async () => {
    if (await isValidForm()) {
      try {
        const databaseRef = await ref(database, `Users/${user}`);
        await set(databaseRef, formData).then(() => {
          navigation.navigate("Profile");
          console.log("User info updated");
        });
        console.log(`input Data : ${JSON.stringify(formData)}`);
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
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View>
              <Icon
                name="chevron-left"
                size={16}
                style={{ paddingVertical: 25 }}
              />
            </View>
          </TouchableOpacity>
          <Text style={style.accountText}>ACCOUNT AND PROFILE</Text>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
              placeholder="Enter a name"
              placeholderTextColor="#a3a3a3"
              value={formData.name}
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
              placeholder="03XXXXXXXXX"
              placeholderTextColor="#a3a3a3"
              keyboardType="numeric"
              onChangeText={(text) => handleTextChange("mobileNumber", text)}
              value={formData.mobileNumber}
              maxLength={11}
            />
          </View>
          {formError.mobileNumber && (
            <View>
              <Text style={{ color: "red", marginLeft: 4 }}>
                {formError.mobileNumber}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            style={{ marginTop: 25 }}
          >
            <View style={style.itemContainer1}>
              <View style={style.itemContainer1}>
                <View>
                  <Icon name="password" size={20} color={COLORS.primary} />
                </View>
                <View style={{ marginLeft: 25 }}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Change Password
                  </Text>
                </View>
              </View>
              <View>
                <Icon name="chevron-right" size={14} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ marginVertical: 40 }}>
            <Button
              title="UPDATE"
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
export default EditProfile;
