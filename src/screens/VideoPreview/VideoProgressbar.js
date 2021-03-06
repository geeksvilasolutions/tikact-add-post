import React, { useEffect } from "react";
const { View, Dimensions } = require("react-native");

const VideoProgressbar = (props) => {
  const window = Dimensions.get("window");

  useEffect(() => {}, [props.currentPosition]);
  
  return (
    <View
      style={{
        position: "absolute",
        height: 100,
        width: window.width - 20,
        paddingLeft: 10,
        paddingRight: 30,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "#8b8b8b",
          height: 95,
          width: 10,
          marginLeft: `${props.currentPosition}%`,
        }}
      />
    </View>
  );
};

export default VideoProgressbar;
