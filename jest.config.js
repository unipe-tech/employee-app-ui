module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.js"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native|react-native-sms-retriever|@react-native-async-storage/async-storage|react-native-modal|react-native-paper|@react-native-material/core|@expo/vector-icons|react-native-button|nodejs-mobile-react-native)/).*/",
  ],
  setupFiles: ["./jestSetup.js"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js",
  },
};
