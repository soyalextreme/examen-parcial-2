import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export interface TitleProps {
  title: string;
}

const Title: React.FunctionComponent<TitleProps> = ({ title }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    padding: 10,
    backgroundColor: "black",
    marginBottom: 20,
    borderRadius: 20,
  },

  title: {
    fontSize: 20,
    color: "white",
  },
});
