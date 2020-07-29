import React, { useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RNCamera } from "react-native-camera";
import VideoOtherOptions from "./VideoOtherOptions";
import BottomContainer from "./BottomContainer/BottomContainer";
import Feather from "react-native-vector-icons/Feather";
import { timers, bottomContainers } from "../constants";
import { style } from "../styles";
import Filters from "./FilterContainer/Filters";
import TimerContainer from "./TimerContainer/TimerContainer";

const CameraScreen = (props) => {
  const [camera, setCamera] = useState(null);
  const [cameraSide, setCameraSide] = useState("front");
  const [cameraFlash, setCameraFlash] = useState("off");
  const [recording, setRecording] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [timerValue, setTimerValue] = useState(timers[1]);
  const [flashIcon, setFlashIcon] = useState("flash-off-outline");
  const [whiteBalance, setWhiteBalance] = useState(
    RNCamera.Constants.WhiteBalance.auto
  );
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [videoUri, setVideoUri] = useState(null);
  const [recorded, setRecorded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showSpeedOptions, setShowSpeedOptions] = useState(true);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [videoProcessing, setVideoProcessing] = useState(false);
  const [bottomContainer, setBottomContainer] = useState(
    bottomContainers.DEFAULT
  );
  const window = Dimensions.get("window");

  const crossIcon = (
    <Feather
      name="x"
      color="white"
      size={30}
      onPress={() => {
        props.navigation.goBack(null);
      }}
    />
  );

  const flashCamera = () => {
    console.log("flash Camera");
    if (cameraFlash === "off") {
      setCameraFlash("torch");
      setFlashIcon("flash-outline");
    } else {
      setCameraFlash("off");
      setFlashIcon("flash-off-outline");
    }
  };
  const runCounter = async () => {
    return new Promise((resolve, reject) => {
      let _currentTimer = timers[currentTimer];
      var interval = setInterval(() => {
        _currentTimer -= 1;
        setTimerValue(_currentTimer);
        if (_currentTimer <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const getCamera = () => {
    return (
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        whiteBalance={whiteBalance}
        style={{ flex: 1 }}
        captureAudio={true}
        type={cameraSide}
        flashMode={cameraFlash}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      >
        {!recording && !videoProcessing ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            onPress={() => setBottomContainer(bottomContainers.DEFAULT)}
          />
        ) : null}

        {videoProcessing ? (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              paddingVertical: window.width / 2,
            }}
          >
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : null}

        {bottomContainer === bottomContainers.DEFAULT && recording === false ? (
          <VideoOtherOptions
            crossIcon={crossIcon}
            flashCamera={flashCamera}
            flashIcon={flashIcon}
            cameraSide={cameraSide}
            setCameraSide={setCameraSide}
            setShowSpeedOptions={setShowSpeedOptions}
            showSpeedOptions={showSpeedOptions}
            setBottomContainer={setBottomContainer}
          />
        ) : null}

        {getBottomContainer()}
      </RNCamera>
    );
  };

  const getBottomContainer = () => {
    switch (bottomContainer) {
      case bottomContainers.DEFAULT:
        return (
          <BottomContainer
            recordVideo={recordVideo}
            stopRecording={stopRecording}
            recording={recording}
            navigation={props.navigation}
            showSpeedOptions={showSpeedOptions}
            setBottomContainer={setBottomContainer}
            setRecording={setRecording}
            setRecordingPaused={setRecordingPaused}
            recordingPaused={recordingPaused}
            recorded={recorded}
            videoUri={videoUri}
            setVideoProcessing={setVideoProcessing}
            setVideoUri={setVideoUri}
            setRecorded={setRecorded}
          />
        );
      case bottomContainers.FILTER:
        return (
          <Filters
            setWhiteBalance={setWhiteBalance}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setBottomContainer={setBottomContainer}
          />
        );
      case bottomContainers.TIMER:
        return <TimerContainer />;
    }
  };

  const recordVideo = async () => {
    try {
      console.log("recording");
      const { uri, codec = "mp4" } = await camera.recordAsync({
        maxDuration: 5,
      });
      console.log("uri: ", uri);
      setVideoUri(uri);
      setVideoDuration(5);
      setRecorded(true);
      setRecording(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const stopRecording = async () => {
    console.log("stopRecording");
    await camera.stopRecording();
    setRecording(false);
  };

  const getCameraOptions = () => {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Image source={{ uri: videoUri }} style={{ flex: 1 }} />
        <View style={{ position: "absolute", width: "100%", height: "100%" }}>
          <VideoOtherOptions
            crossIcon={crossIcon}
            flashCamera={flashCamera}
            flashIcon={flashIcon}
            setBottomContainer={setBottomContainer}
            cameraSide={cameraSide}
            setCameraSide={setCameraSide}
            setShowSpeedOptions={setShowSpeedOptions}
            showSpeedOptions={showSpeedOptions}
          />
          <BottomContainer
            recordVideo={recordVideo}
            stopRecording={stopRecording}
            recording={recording}
            navigation={props.navigation}
            showSpeedOptions={showSpeedOptions}
            setBottomContainer={setBottomContainer}
            setRecording={setRecording}
            setRecordingPaused={setRecordingPaused}
            recordingPaused={recordingPaused}
            recorded={recorded}
            videoUri={videoUri}
            setVideoProcessing={setVideoProcessing}
            setVideoUri={setVideoUri}
            setRecorded={setRecorded}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      <StatusBar hidden={true} />
      {getCamera()}
      {/* {!recorded ? getCamera() : getCameraOptions()} */}
    </View>
  );
};

export default CameraScreen;
