import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { timers, speeds, cameraFlipIcon, bottomContainers } from "../constants";
import { style } from "../styles";
import { getIcon } from "../../../utility";

const VideoEditTools = (props) => {
  const [currentSpeed, setCurrentSpeed] = useState(2);
  const flipCamera = () => {
    return props.cameraSide === "front"
      ? props.setCameraSide("back")
      : props.setCameraSide("front");
  };

  return (
    <View
      style={{
        alignItems: "flex-end",
        position: "absolute",
        right: 5,
        height: 320,
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity style={{ alignItems: "center" }} onPress={flipCamera}>
        {getIcon("camera-reverse-outline")}
        <Text style={{ color: "white" }}>Flip</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => props.setShowSpeedOptions(!props.showSpeedOptions)}
      >
        {getIcon("speedometer-outline")}
        <Text style={{ color: "white" }}>Speed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => props.setBottomContainer(bottomContainers.FILTER)}
      >
        {getIcon("color-filter-outline")}
        <Text style={{ color: "white" }}>Filters</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => props.setBottomContainer(bottomContainers.TIMER)}
      >
        {getIcon("stopwatch-outline")}
        <Text style={{ color: "white" }}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoEditTools;
