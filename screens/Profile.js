import COLORS from "../constants/colors";
const {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} = require("react-native");
const Logo = require("../assets/images/AppFoodLogo.png");
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { database } from "../firebase/firebase.config";
import { ref, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const itemList = [
    { text: "Account and Prfile", icon: "pencil" },
    { text: "Order History", icon: "list-ul" },
    { text: "Signout", icon: "sign-out" },
  ];

  const handleProfile = (val) => {
    console.log(val);
    if (val === "Account and Prfile") {
      navigation.navigate("EditProfile");
    } else if (val === "Signout") {
      navigation.navigate("Welcome");
    } else if (val === "Order History") {
      console.log(val);
      navigation.navigate("OrdersHistory");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getUserData = async () => {
        try {
          const dataRef = ref(database, `Users/${user}`);
          const snapShot = await get(dataRef);

          if (snapShot.exists()) {
            console.log("user exist");
            const data = await snapShot.val();
            setName(data.name);
            console.log(`User : ${JSON.stringify(data.name)}`);
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      getUserData();
    }, [user])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Image source={Logo} style={styles.img} />
        <View style={{}}>
          <Text
            style={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}
          >
            {name}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 25 }}>
        {itemList.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleProfile(item.text)}
          >
            <View key={index} style={styles.itemContainer}>
              <View style={[styles.itemContainer]}>
                <View>
                  <Icon name={item.icon} size={20} color={COLORS.primary} />
                </View>
                <View style={{ marginLeft: 25 }}>
                  <Text style={styles.heading}>{item.text}</Text>
                </View>
              </View>
              <View>
                <Icon name="chevron-right" size={14} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
  },

  img: {
    height: 100,
    width: 100,
    borderRadius: 75,
    padding: 10,
    borderWidth: 5,
    borderColor: COLORS.primary,
    margin: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Profile;

// import COLORS from "../constants/colors";

// const { View, Text, StyleSheet, Image, ScrollView } = require("react-native");
// const Logo = require("../assets/images/AppFoodLogo.png");
// import Icon from "react-native-vector-icons/FontAwesome";
// import Test from "./Test";

// const Profile = () => {
//   const itemList = ["Account and Prfile", "Order History", "Logout"];
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={{ width: 315 }}>
//           <Icon name="chevron-left" size={16} />
//         </View>
//         <View>
//           <Text style={styles.mainHeading}>My Profile</Text>
//         </View>
//         <View>
//           <Text style={styles.mainSubHeading}>Person details</Text>
//         </View>
//         <View style={styles.profileCard}>
//           <View style={styles.profile}>
//             {/* <Icon name="user" size={50} style={styles.profileImage} /> */}
//             <Image source={Logo} style={styles.profileImage} />
//           </View>
//           <View style={{}}>
//             <View>
//               <Text style={styles.profileHeading}>Muhammad Bilal</Text>
//             </View>

//             <View>
//               <Text style={styles.profileSubHeading}>
//                 muhdbilal81@gmail.com
//               </Text>
//               <View style={styles.divider} />
//             </View>

//             <View>
//               <Text style={styles.profileSubHeading}>03494615145</Text>
//             </View>
//             <View style={styles.divider} />

//             <View>
//               <Text
//                 style={{
//                   ...styles.profileSubHeading,
//                   ...{ width: 182 },
//                 }}
//               >
//                 No 15 uti street off ovie palace road effurun delta state
//               </Text>
//             </View>
//           </View>
//         </View>

//         {itemList.map((item, index) => (
//           <View key={index} style={styles.itemContainer}>
//             <View>
//               <Icon name="user" size={20} color={COLORS.primary} />
//             </View>
//             <View>
//               <Text style={{ fontSize: 18, fontWeight: "700" }}>{item}</Text>
//             </View>
//             <View>
//               <Icon name="chevron-right" size={16} />
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: COLORS.white,
//     paddingTop: 30,
//     fontFamily: "SF pro Text",
//   },
//   mainHeading: {
//     fontSize: 34,
//     fontWeight: "500",
//     width: 315,
//     marginVertical: 40,
//   },

//   mainSubHeading: {
//     fontSize: 18,
//     fontWeight: "600",
//     width: 315,
//     marginBottom: 10,
//   },
//   profileCard: {
//     backgroundColor: COLORS.white,
//     flexDirection: "row",
//     height: 197,
//     width: 315,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   itemContainer: {
//     backgroundColor: COLORS.white,
//     borderRadius: 25,
//     height: 60,
//     width: 315,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 25,
//     marginVertical: 15,
//   },
//   profile: {
//     borderRadius: 10,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 16,
//     alignSelf: "flex-start",
//     marginTop: 25,
//   },
//   profileImage: {
//     height: 91,
//     width: 100,
//     backgroundColor: "pink",
//     borderRadius: 10,
//     textAlign: "center",
//   },
//   profileHeading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingBottom: 4,
//     fontFamily: "SF pro Text",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.grey,
//     marginTop: 8,
//   },
//   profileSubHeading: {
//     color: COLORS.black,
//     fontSize: 16,
//     fontFamily: "SF pro Text",
//     fontWeight: "300",
//     width: 182,
//   },
// });

// export default Profile;
