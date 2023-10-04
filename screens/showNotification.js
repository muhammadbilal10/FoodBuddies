import PushNotification from "react-native-push-notification";

// Function to configure and show notifications
const showNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: "default-channel-id", // Set your channel ID for Android
    title: title,
    message: message,
    largeIcon: "ic_launcher", // Set your notification icon for Android
    smallIcon: "ic_notification", // Set your small notification icon for Android
    vibrate: true, // Vibrates the device when the notification is shown
  });
};

export default showNotification;
