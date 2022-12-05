import { View, SafeAreaView, Text } from "react-native";
import { FONTS } from "../../../constants/Theme";
import { styles } from "../../../styles";

const DocumentsView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: "20%" }}>
        <Text
          accessibilityLabel="MoreDetails"
          style={{ ...FONTS.h3, alignSelf: "center" }}
        >
          More Details Coming Soon
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DocumentsView;
