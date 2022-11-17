import { AppBar } from "@react-native-material/core";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import { COLORS, FONTS } from "../../constants/Theme";

const Header = ({ title, onLeftIconPress, onRightIconPress }) => {
  return (
    <AppBar
      title={title}
      contentContainerStyle={{ height: 50 }}
      color={COLORS.primary}
      titleStyle={{ color: COLORS.white, ...FONTS.h3 }}
      leading={
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back"
            onPress={onLeftIconPress}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      }
      trailing={
        onRightIconPress && (
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-forward"
              onPress={onRightIconPress}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        )
      }
    />
  );
};

export default Header;
