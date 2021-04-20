import * as React from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { numbersStateType, resultStateType, updateStateType } from "../App";
import Title from "./Title";

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
      <Title title="Numeros registrados" />
      <ScrollView>
        {numbers.map((num) => (
          <View key={num.id}>
            <Text>{num.val}</Text>
            <Button
              title="Elegir"
              onPress={() =>
                setUpdate({ id: num.id, val: num.val, status: true })
              }
            />
          </View>
        ))}
      </ScrollView>
      <View>
        <Title title="Resultados" />
        <View>
          <Text>Media</Text>
          <Text>{results.media}</Text>
        </View>
        <Text>Mediana</Text>
        <View>
          {results.mediana?.map((mediana) => (
            <Text>{mediana}</Text>
          ))}
        </View>
        <View>
          <Text>Desviacion Estandar</Text>
          {results.desviacion}
        </View>
      </View>
    </>
  );
};

export default Results;
