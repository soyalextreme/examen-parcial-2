import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormView from "./components/FormView";
import Results from "./components/Results";
import Title from "./components/Title";

export type numberType = { id: string; val: number };
export type numbersStateType = Array<numberType>;
export type updateStateType = {
  status: boolean;
  id: string;
  val: number | undefined;
};
export type resultStateType = {
  media: number | undefined;
  mediana: Array<number> | undefined;
  desviacion: number | undefined;
};

export default function App() {
  const [numbers, setNumbers] = React.useState<numbersStateType>([]);
  const [update, setUpdate] = React.useState<updateStateType>({
    status: false,
    id: "",
    val: undefined,
  });

  const [results, setResults] = React.useState<resultStateType>({
    media: undefined,
    mediana: undefined,
    desviacion: undefined,
  });

  React.useEffect(() => {
    calculate();
  }, [numbers]);

  const calculate = () => {
    let sum: number = 0;
    let numberArray: Array<number> = [];
    numbers.forEach((num) => {
      sum += num.val;
      numberArray.push(num.val);
    });

    // media
    const media = sum / numbers.length;

    let sortedArray = numberArray.sort();
    let half = numbers.length / 2;
    let mediana = [];
    if (numbers.length % 2 === 0) {
      // numero par
      mediana = [sortedArray[Math.floor(half)]];
    } else {
      // impar tiene 2 medianas
      mediana = [
        sortedArray[Math.floor(half)],
        sortedArray[Math.floor(half) + 1],
      ];
    }

    // desviacion
    let sumMenosMedia = 0;
    numbers.forEach((num) => {
      sumMenosMedia += Math.pow(num.val - media, 2);
    });

    const desviacion = Math.sqrt(sumMenosMedia / numbers.length - 1);

    setResults({
      media: parseInt(media.toFixed(2)),
      mediana,
      desviacion: parseInt(desviacion.toFixed(2)),
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Title title={update.status ? "Actualizando" : "Agregando"} />
        <FormView
          value={update.val}
          setNumArray={setNumbers}
          numArray={numbers}
          update={update}
        />
        {numbers.length > 0 ? (
          <Results numbers={numbers} results={results} setUpdate={setUpdate} />
        ) : (
          <Text>No tienes datos aun</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
