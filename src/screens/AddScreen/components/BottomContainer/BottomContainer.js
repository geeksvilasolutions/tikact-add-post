import React, { useState } from "react";
import { style } from "../../styles";
import { View, Text } from "react-native";

import RecordButton from "./RecordButton";
import SpeedBar from "./SpeedBar";
import StopRecordButton from "./StopRecordButton";
import MiddleContainer from "./MiddleContainer/MiddleContainer";
import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/RightContainer";
import VideoDurationContainer from "./VideoDurationContainer/VideoDurationContainer";

const BottomContainer = (props) => {
  return (
    <View style={style.bottomContainer}>
      <SpeedBar
        showSpeedOptions={props.showSpeedOptions}
        recording={props.recording}
        setCurrentSpeed={props.setCurrentSpeed}
        currentSpeed={props.currentSpeed}
      />
      <View style={style.bottomVideoIconsContainer}>
        <LeftContainer recording={props.recording} />
        <MiddleContainer
          recording={props.recording}
          recordVideo={props.recordVideo}
          stopRecording={props.stopRecording}
          selectedSound={props.selectedSound}
        />
        <RightContainer
          recording={props.recording}
          navigation={props.navigation}
          recorded={props.recorded}
          videoUris={props.videoUris}
          setVideoProcessing={props.setVideoProcessing}
          currentSpeed={props.currentSpeed}
          setRecording={props.setRecording}
          setRecorded={props.setRecorded}
          setVideoUris={props.setVideoUris}
          setPausedTimes={props.setPausedTimes}
          pausedTimes={props.pausedTimes}
          progressBarPercent={props.progressBarPercent}
          setRecordedVideoDuration={props.setRecordedVideoDuration}
          recordedVideoDuration={props.recordedVideoDuration}
          setRemainingVideoDuration={props.setRemainingVideoDuration}
          totalVideoDuration={props.totalVideoDuration}
          processedVideos={props.processedVideos}
          setProcessedVideos={props.setProcessedVideos}
          processedVideos={props.processedVideos}
          setStartCounter={props.setStartCounter}
          setEndCounter={props.setEndCounter}
          selectedSound={props.selectedSound}
        />
      </View>
      {!props.recording &&
      props.remainingVideoDuration === props.totalVideoDuration ? (
        <VideoDurationContainer
          setTotalVideoDuration={props.setTotalVideoDuration}
          setPartVideoDuration={props.setPartVideoDuration}
          totalVideoDuration={props.totalVideoDuration}
          setRemainingVideoDuration={props.setRemainingVideoDuration}
        />
      ) : null}
    </View>
  );
};

export default BottomContainer;
