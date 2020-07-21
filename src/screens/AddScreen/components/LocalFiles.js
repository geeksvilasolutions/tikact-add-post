import React from "react";
import { View, Text } from "react-native";
import { style } from "../styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LocalVideos from "./LocalVideos";

const Tab = createMaterialTopTabNavigator();

const ImageScreen = () => {
  return (
    <View>
      <Text>ImageScreen</Text>
    </View>
  );
};

const LocalFiles = (props) => {
  return (
    <View style={{ flex: 1, justifyContnet: "row", backgroundColor: "white" }}>
      <Text style={{ alignSelf: "center", margin: 30 }}>All Videos</Text>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "black",
          showLabel: true,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Videos"
          component={LocalVideos}
          options={{ tabBarLabel: "Videos" }}
        />
        <Tab.Screen
          name="Images"
          component={ImageScreen}
          options={{ tabBarLabel: "Images" }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default LocalFiles;
