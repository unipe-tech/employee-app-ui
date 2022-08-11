import { useEffect, useState } from "react";
import { AppBar, Button } from "@react-native-material/core";
import {
  SafeAreaView,
  Text,
} from "react-native";
import { form, styles } from "../../styles";


export default PanForm = () => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    console.log("Count: ", count);
  }, [count]);

  useEffect(() => {
    console.log("Disabled: ", disabled);
  }, [disabled]);

  const increment = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        setCount(count+1);
        resolve();
      }, 2000);
    });
  };

  const incrementAndEnable = () => {
    console.log("incrementAndEnabled : ", disabled);
    increment()
      .then(() => {
        setDisabled(false);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>

        <AppBar
          title="Test Loading"
          color="#4E46F1"
        />
        
        <Text style={form.formHeader}>Count: {count}</Text>

        <Button
          title={disabled ? "Incrementing ..." : "Increment"}
          type="solid"
          color="#4E46F1"
          style={form.skipButton}
          disabled={disabled}
          onPress={() => incrementAndEnable()}
        />
        
      </SafeAreaView>
    </>
  );
};
