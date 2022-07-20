import { View, Text } from "react-native"
import React from "react"
import { bankform } from "../screens/styles"
import { Icon } from "@react-native-material/core"

/**
 *
 * @param title -> Used to provide the title to the info card
 * @param iconName -> Icon used in the info card
 */

const InfoCard = ({ title, iconName }) => {
  return (
    <View style={bankform.infoCard}>
      <Icon name={iconName || "info-outline"} size={20} color="#4E46F1" />
      <Text style={bankform.infoText}>{title}</Text>
    </View>
  )
}

export default InfoCard