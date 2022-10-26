import React from "react";
import { Image, SafeAreaView, Text,View } from "react-native";

import { styles } from "../../styles";

const DocumentsView = () => (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: "20%" }}>
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          More Details Coming Soon
        </Text>
      </View>
    </SafeAreaView>
  );

export default DocumentsView;
