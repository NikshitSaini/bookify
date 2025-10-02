import React from "react";
import { View } from "react-native";

const Spacer=({ height = 40, width = "100%" })=> {
  return (
  <View style={{ width,height }} />
)
}
export default Spacer;