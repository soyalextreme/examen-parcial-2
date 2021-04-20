import * as React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { numbersStateType, resultStateType, updateStateType } from "../types";
import Title from "./Title";
import { Colors } from "../constants";

export interface ResultsProps {
  numbers: numbersStateType;
  results: resultStateType;
  setUpdate: (update: updateStateType) => void;
}

const Results: React.FunctionComponent<ResultsProps> = ({
  numbers,
  results,
  setUpdate,
}) => {
  return (
    <>
      <View style={style.numbersContainer}>
        <Title title="Numeros registrados" />
        <ScrollView>
          {numbers.map((num) => (
            <View key={num.id}>
              <TouchableOpacity
                style={style.touchableButton}
                onLongPress={() =>
                  setUpdate({ id: num.id, val: num.val, status: true })
                }
              >
                <Text style={style.textNumbers}>{num.val}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={style.resultsContainer}>
        <Text style={style.titleResults}>Resultados</Text>
        <View style={style.results}>
          <Text style={style.boldText}>Media</Text>
          <Text>{results.media}</Text>
          <Text style={style.boldText}>Mediana</Text>
          {results.mediana?.map((mediana, index) => (
            <Text key={index}>{mediana}</Text>
          ))}
          <Text style={style.boldText}>Desviacion Estandar</Text>
          <Text>
            {!results.desviacion ? "Necesitamos mas datos" : results.desviacion}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Results;

const style = StyleSheet.create({
  numbersContainer: {
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 10,
    width: "80%",
    height: "40%",
    padding: 30,
    display: "flex",
    marginVertical: 40,
  },

  touchableButton: {
    backgroundColor: Colors.green,
    marginBottom: 10,
    marginLeft: 50,
    padding: 10,
    width: "50%",
    borderRadius: 50,
  },

  textNumbers: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  results: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 10,
  },

  titleResults: {
    fontSize: 20,
    color: Colors.blue,
    fontWeight: "bold",
    marginTop: 70,
    marginRight: 30,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
  },

  boldText: {
    fontWeight: "bold",
  },

  resultsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
