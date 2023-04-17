import { View, Text, Image, Alert, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';


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

    const services = [
      {
        id: "0",
        image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
        name: "shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "11",
        image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
        name: "T-shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "12",
        image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
        name: "dresses",
        quantity: 0,
        price: 10,
      },
      {
        id: "13",
        image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
        name: "jeans",
        quantity: 0,
        price: 10,
      },
      {
        id: "14",
        image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
        name: "Sweater",
        quantity: 0,
        price: 10,
      },
      {
        id: "15",
        image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
        name: "shorts",
        quantity: 0,
        price: 10,
      },
      {
        id: "16",
        image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
        name: "Sleeveless",
        quantity: 0,
        price: 10,
      },
    ];

  return ( 
    <SafeAreaView style={{backgroundColor: "#f0f0f0", flex: 1}}>
      <ScrollView style={{flex: 1}}> 
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

        {/*Image Carousel*/}
        <Carousel />

        {/*Services*/}
        <Services />

        {/*Render all Products*/}
        {services.map((item,index) => (
          <DressItem item={item} key={index}/>
        ))}
      </ScrollView>
     </SafeAreaView>
  )
}

export default HomeScreen