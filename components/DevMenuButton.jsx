import React from "react";
import { Button } from "@react-native-material/core";

import { dev } from "../styles";

export default DevMenuButton = ({ onPress, title }) => <Button title={title} style={dev.title} uppercase={false} onPress={onPress} />;
