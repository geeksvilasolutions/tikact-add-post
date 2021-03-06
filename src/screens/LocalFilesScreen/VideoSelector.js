import React from "react";
import { View, Image, Text, TouchableOpacity, Button } from "react-native";

const VideoSelector = (props) => {
  const getDuration = () => {
    const playDuration = props.selectedVideo.node.image.playableDuration;
    const durationMin = Math.floor(playDuration / 60);
    const durationSec = playDuration % 60;
    return `${durationMin}:${durationSec}`;
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        padding: 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    >
      <View>
        <View style={{ height: 130 }}>
          {props.selectedVideo ? (
            <View>
              <Image
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 130,
                  width: 100,
                }}
                source={{ uri: props.selectedVideo.node.image.uri }}
              />
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  height: 20,
                  width: 100,
                  backgroundColor: "black",
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  color: "white",
                  marginRight: 5,
                  fontSize: 20,
                  marginLeft: 35,
                }}
              >
                {getDuration()}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginTop: 5,
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              paddingTop: 10,
              color: "grey",
              fontSize: 15,
            }}
          >
            You can select both videos and photos
          </Text>
          <View style={[{ width: 80 }]}>
            <Button
              title="Next"
              onPress={() => {
                props.navigation.navigate("VideoPreview", {
                  videoUri: props.selectedVideo.node.image.uri,
                  totalVideoDuration:
                    props.selectedVideo.node.image.playableDuration,
                });
              }}
              disabled={props.selectedVideo ? false : true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoSelector;
