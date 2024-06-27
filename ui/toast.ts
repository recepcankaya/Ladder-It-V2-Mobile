import Toast from "react-native-toast-message";

export const successToast = (title: string, message: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};

export const errorToast = (title: string, message: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};
