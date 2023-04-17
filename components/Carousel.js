import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        "https://media.gettyimages.com/id/459292777/photo/laundry-service.jpg?s=612x612&w=gi&k=20&c=1Qq6DcfEmb7qaM8b3AyrLxWT-QJIS5bhBbJDH4-HWOQ=",
        "https://media.istockphoto.com/id/472099377/photo/laundry-service.jpg?s=612x612&w=0&k=20&c=T202xZzj1SuPeRX8LEUk5pwvJiwqzET7F2vTDS9rUaI=",
        
    ];
  return (
    <View>
      <SliderBox
       images={images} 
       autoPlay
       circleLoop
       dotColor={"#13274f"}
       inactiveDotColor="#90a4ae"
       imageComponentStyle={{
        borderRadius: 6,
        width: "94v"
       }}
    />

    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})