import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { promisify } from "../../utility";
var RNFS = require("react-native-fs");

const SoundGrid = (props) => {
  const [sounds, setSounds] = useState([]);
  const [activeSound, setActiveSound] = useState(null);

  useEffect(() => {
    getSounds();
  }, []);

  const fetchSound = async (url, slug) => {
    const soundsFolder = `${RNFS.DocumentDirectoryPath}/sound/`;
    const exist = await RNFS.exists(soundsFolder);
    console.log("exist : ", exist);

    if (!exist) {
      await RNFS.mkdir(soundsFolder);
      await RNFS.downloadFile({
        fromUrl: url,
        toFile: `${soundsFolder}${slug}.mp4`,
      }).promise;
    }
    props.playSound(`${soundsFolder}${slug}.mp4`);
  };

  const playSound = async (_activeSound) => {
    console.log("playSound");
    const sound = await promisify(_activeSound.url);
    console.log("sound fetched: ", sound);
    setActiveSound({ ..._activeSound, loader: false, sound });
    sound.setNumberOfLoops(-1);
    sound.play();
  };

  const getSounds = () => {
    setSounds([
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#f28b82",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#fbbc04",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#fff475",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#ccff90",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#a7ffeb",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#cbf0f8",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#aecbfa",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#d7aefb",
      },
      {
        url: "https://tikact.s3.ap-south-1.amazonaws.com/tum+mile.mp4",
        name: "Tum Mile",
        slug: "tum-mile",
        color: "#fdcfe8",
      },
    ]);
  };

  return (
    <FlatList
      style={{ padding: 10 }}
      data={sounds}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
              backgroundColor: `${item.color}`,
              height: 150,
              borderRadius: 20,
              alignItems: "center",
            }}
            onPress={async () => {
              if (activeSound) {
                await activeSound.sound.stop();
              }
              fetchSound(item.url, item.slug);
            }}
          >
            {activeSound && activeSound.index === index ? (
              activeSound.loader ? (
                <ActivityIndicator
                  style={{ position: "absolute", top: "45%" }}
                  color="#00ff00"
                />
              ) : (
                <Ionicons
                  name="pause-circle-outline"
                  color="white"
                  size={40}
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: "40%",
                  }}
                  onPress={async () => {
                    await activeSound.sound.stop();
                    setActiveSound(null);
                  }}
                />
              )
            ) : (
              <Ionicons
                name="play-circle-outline"
                color="white"
                size={40}
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  top: "40%",
                }}
                onPress={async () => {
                  if (activeSound) {
                    await activeSound.sound.stop();
                  }

                  playSound({ index, url: item.url, loader: true });
                  setActiveSound({ index, url: item.url, loader: true });
                }}
              />
            )}

            <Text style={{ color: "white", fontSize: 20 }}>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default SoundGrid;
