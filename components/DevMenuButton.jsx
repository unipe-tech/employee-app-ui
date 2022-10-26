import { Button } from "@react-native-material/core";

import { dev } from "../styles";

const DevMenuButton = ({ onPress, title }) => <Button title={title} style={dev.title} uppercase={false} onPress={onPress} />;

export default DevMenuButton