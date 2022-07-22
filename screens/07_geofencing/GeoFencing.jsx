import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Linking } from "react-native";
import RNLocation from "react-native-location";
import { PermissionsAndroid } from "react-native";

RNLocation.configure({
  distanceFilter: 400,
  desiredAccuracy: {
    android: "highAccuracy",
  },
});

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

const GeoFencing = ({ url }) => {
  const [viewLocation, setViewLocation] = useState([]);
  const [isPresent, setIsPresent] = useState(false);

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
        alert("You can use the location");
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

  return (
    <View style={styles.container}>
      <Text>React Native Geolocation</Text>
      <View
        style={{ marginTop: 10, padding: 10, borderRadius: 10, width: "40%" }}
      >
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <View>
        <Text>Latitude: {viewLocation.latitude} </Text>
        <Text>Longitude: {viewLocation.longitude} </Text>
        {isPresent ? (
          <Text>IsPresent: True </Text>
        ) : (
          <Text>IsPresent: False </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GeoFencing;
