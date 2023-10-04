import Profile from "./Profile";
import Basket from "./Basket";
import Search from "./Search";
import HomeScreen from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";

const Tab = createBottomTabNavigator();

const HomeTabs = ({ route }) => {
  const user = route?.params?.user;

  const icons = {
    Home: "home",
    Search: "search",
    Basket: "shopping-basket",
    Profile: "user",
  };
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarLabel: () => null }}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={icons.Home} size={20} color={color} />
          ),
        }}
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={icons.Search} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={Basket}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={icons.Basket} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name={icons.Profile} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
