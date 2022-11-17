module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["jest-enzyme"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native|react-native-sms-retriever|@react-native-async-storage/async-storage|react-native-modal|react-native-paper|@react-native-material/core|@expo/vector-icons|react-native-button|nodejs-mobile-react-native|react-native-splash-screen|react-native-animatable|expo-font|expo-modules-core|expo-asset|expo-constants|expo-file-system|@react-navigation|react-native-countdown-component|react-native-image-picker|react-native-camera|react-native-countdown-component|react-native-extended-stylesheet)/).*/",
  ],
  setupFiles: ["<rootDir>/setup-tests.js"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js",
  },
  testPathIgnorePatterns: ["<rootDir>/testHelpers"],
};
