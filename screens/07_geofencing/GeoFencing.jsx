import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import RNLocation from "react-native-location";
import { PermissionsAndroid } from "react-native";
// import MapView from "react-native-maps";
import { Button } from "@react-native-material/core";
import { form } from "../../styles";
import { Ionicons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

RNLocation.configure({
  distanceFilter: 400,
  desiredAccuracy: {
    android: "highAccuracy",
  },
});

const statuses = ["IN", "OUT"];

function measure(lat1, lon1, lat2, lon2) {
  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}

const placeLatLong = {
  latitude: 29.789576337052445,
  longitude: 76.40859246253967,
};

const GeoFencing = ({ url, route }) => {
  const [viewLocation, setViewLocation] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [status, setStatus] = useState("IN");
  const navigation = useNavigation();
  const [selfieImage, setSelfieImage] = useState(null);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const getLocation = async () => {
    let permission = await RNLocation.checkPermission({
      android: {
        detail: "coarse", // or 'fine'
      },
    });

    console.log(permission);

    let location;
    if (!permission) {
      permission = await RNLocation.requestPermission({
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);
      setViewLocation(location);
      console.log(
        measure(
          location.latitude,
          location.longitude,
          placeLatLong.latitude,
          placeLatLong.longitude
        )
      );
      if (
        measure(
          location.latitude,
          location.longitude,
          placeLatLong.latitude,
          placeLatLong.longitude
        ) < 200
      ) {
        setIsPresent(true);
      } else {
        setIsPresent(false);
      }
    } else {
      location = await RNLocation.getLatestLocation({ timeout: 100 });
      console.log(location);
      setViewLocation(location);
      console.log(
        measure(
          location.latitude,
          location.longitude,
          placeLatLong.latitude,
          placeLatLong.longitude
        )
      );
      if (
        measure(
          location.latitude,
          location.longitude,
          placeLatLong.latitude,
          placeLatLong.longitude
        ) < 200
      ) {
        setIsPresent(true);
      } else {
        setIsPresent(false);
      }
    }
  };

  React.useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);

  React.useEffect(() => {
    getLocation();
    if (
      route?.params?.imgUri &&
      viewLocation?.latitude &&
      viewLocation?.longitude
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [disabled, route, viewLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Date: ${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`}</Text>
      <Text
        style={styles.time}
      >{`${new Date().getHours()}:${new Date().getMinutes()}`}</Text>
      <Text style={styles.time}>{selfieImage}</Text>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <View style={styles.flexrow}>
        {statuses.map((item, index) => {
          return (
            <Button
              key={index}
              uppercase={false}
              style={status == item ? styles.chosenButton : styles.choiceButton}
              title={item}
              type="solid"
              color="#4E46F1"
              onPress={() => setStatus(item)}
            />
          );
        })}
      </View>

      {route?.params?.imgUri != null && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${route?.params?.imgUri}` }}
          style={{
            width: 190,
            height: 190,
            resizeMode: "cover",
            alignSelf: "center",
            marginTop: 40,
          }}
        />
      )}

      {/* Image Button */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RNPhotoCapture", {
            type: "ATTENDANCE_SELFIE",
            navRoute: "GeoFencing",
          })
        }
        style={styles.selfieCont}
      >
        <Text style={styles.clickSelfie}>Click Selfie</Text>
        <View>
          <Ionicons name="camera" color="white" size={50} />
        </View>
      </TouchableOpacity>
      <View style={styles.button}>
        <Button
          disabled={disabled}
          title="Submit"
          style={styles.btnChild}
          titleStyle={styles.btnTextStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  time: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
  },
  flexrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  chosenButton: {
    padding: 2,
    marginTop: 40,
    width: 140,
    height: 40,
    fontSize: 20,
  },
  choiceButton: {
    padding: 2,
    marginTop: 40,
    width: 140,
    height: 40,
    fontSize: 20,
    backgroundColor: "grey",
  },
  selfieCont: {
    alignSelf: "center",
    marginTop: 50,
    backgroundColor: "#4E46F1",
    borderRadius: 4,
    alignItems: "center",
    padding: 15,
  },
  clickSelfie: {
    color: "white",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  btnChild: {
    width: "90%",
    height: 50,
    alignItems: "center",
  },
  btnTextStyle: {
    textAlign: "center",
    marginTop: 12,
  },
});

export default GeoFencing;

// <View
//         style={{ marginTop: 10, padding: 10, borderRadius: 10, width: "40%" }}
//       >
//         <Button title="Get Location" onPress={getLocation} />
//       </View>
//       <View>
//         <Text>Latitude: {viewLocation.latitude && viewLocation.latitude} </Text>
//         <Text>
//           Longitude: {viewLocation.longitude && viewLocation.longitude}{" "}
//         </Text>
//         {isPresent ? (
//           <Text>IsPresent: True </Text>
//         ) : (
//           <Text>IsPresent: False </Text>
//         )}
//       </View>
