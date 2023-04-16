import { View, Text, Image, Alert, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";


const HomeScreen = () => {
    const navigation = useNavigation();
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("we are loadimg your location"); 
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    useEffect(() => {
      checkIfLocationEnabled();
      getCurrentLocation();
    }, []);
    const checkIfLocationEnabled = async () => {
      let enabled = await Location.hasServicesEnabledAsync();
      if(!enabled) {
        Alert.alert(
          'Location services not enabled', 
          'Please enable the Location services', 
          [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else{
        setLocationServicesEnabled(enabled)
      }
    }
    const getCurrentLocation = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== "granted") {
      Alert.alert(
        'Permission denied ', 
        'allow the app to use the locaton services', 
        [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    };
    const {coords} = await Location.getCurrentPositionAsync(); 
    // console.log(coords)
    if(coords) {
      const {latitude, longitude} = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
    });
      // console.log(response)
      for(let item of response){
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address)
      }
    }
    } 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
  return ( 
    <SafeAreaView>
      {/*Location and Profile*/}
       <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
          <MaterialIcons name="location-on" size={30} color="#EF0107" />
          <View>
            <Text style={{fontSize: 18, fontWeight: "800"}}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View> 
          <Pressable style={{ marginLeft: "auto",marginRight: 7 }}>
            <Image 
            style={{ width: 40, height: 40, borderRadius: 28 }} 
            source={{
              uri:"https://lh3.googleusercontent.com/ogw/AOLn63E2k-hU-mfELjIZ_d2iImNJNmD1twrs-RfH4yNMLg=s32-c-mo"
            }}
            />
          </Pressable>
       </View>
       {/*Search Bar*/}
       <View 
       style={{
          padding: 10, 
          margin: 10, 
          flexDirection: "row", 
          alignitems: "center ",
          justifyContent: "space-between",
          borderWidth: 8.8,
          borderColor: "#c0c0c0",
          borderRadius: 2
          }}
        >
        <TextInput placeholder="Search for items or More"/>
        <EvilIcons name="search" size={24} color="#EF0107" />
        </View> 
    </SafeAreaView>
  )
}

export default HomeScreen