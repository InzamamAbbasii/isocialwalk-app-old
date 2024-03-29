import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Header = ({
  navigation,
  title,
  titleStyle,
  onButtonPress,
  numberOfLines,
}) => {
  const left_arrow = require("../../assets/images/left-arrow.png");
  return (
    <View style={styles.headerView}>
      <TouchableOpacity
        style={{ padding: 10, paddingLeft: 0 }}
        onPress={() => navigation?.goBack()}
      >
        <Image source={left_arrow} style={{ width: 14, height: 22 }} />
      </TouchableOpacity>
      {numberOfLines ? (
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      ) : (
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      )}
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    color: "#000000",
    textAlign: "center",
    flex: 1,
    fontSize: 23,
    fontFamily: "Rubik-Medium",
  },
});
