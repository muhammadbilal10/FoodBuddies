// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import socket from "./SocketService"; // Import your WebSocket service

// const App = () => {
//   const [deliveryPersonLocation, setDeliveryPersonLocation] = useState(null);

//   useEffect(() => {
//     // Listen for location updates from the server via WebSocket
//     socket.on("updateLocation", (location) => {
//       setDeliveryPersonLocation(location);
//     });

//     // Clean up socket connection on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {deliveryPersonLocation && (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: deliveryPersonLocation.latitude,
//             longitude: deliveryPersonLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: deliveryPersonLocation.latitude,
//               longitude: deliveryPersonLocation.longitude,
//             }}
//             title="Delivery Person"
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default App;
