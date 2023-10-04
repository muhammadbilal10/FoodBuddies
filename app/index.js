import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../contexts/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import EmailVerification from "../screens/Verification";
import Profile from "../screens/Profile";
import ItemNotFound from "../screens/ItemNotFound";
import AddToBasket from "../screens/AddToBasket";
import Basket from "../screens/Basket";
import Checkout from "../screens/Checkout";
import ConfirmOrder from "../screens/ConfirmOrder";
import Search from "../screens/Search";
import Welcome from "../screens/Welcome";
import HomeScreen from "../screens/Home";
import HomeTabs from "../screens/HomeTabs";
import EditProfile from "../screens/EditProfile";
import ChangePassword from "../screens/ChangePassword";
import OrdersHistory from "../screens/OrdersHistory";
import OrderDetails from "../screens/OrderDetails";
const Stack = createNativeStackNavigator();

const Home = ({ route }) => {
  const userData = route?.params?.user;
  console.log(`App.js : ${userData}`);
  return (
    <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />

        <Stack.Screen name="Basket" component={Basket} />
        <Stack.Screen name="OrdersHistory" component={OrdersHistory} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />

        <Stack.Screen name="AddToBasket" component={AddToBasket} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />

        {/* <Stack.Screen name="EmailVerification" component={EmailVerification} /> */}
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default Home;
