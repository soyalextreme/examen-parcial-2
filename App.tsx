import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormView from "./components/FormView";
import Results from "./components/Results";
import Title from "./components/Title";
import { numbersStateType, updateStateType, resultStateType } from "./types";
import manipulate from "./database/manipulate";

export default function App() {
  const [numbers, setNumbers] = React.useState<numbersStateType>([]);
  const [update, setUpdate] = React.useState<updateStateType>({
    status: false,
    id: undefined,
    val: undefined,
  });

  const [results, setResults] = React.useState<resultStateType>({
    media: undefined,
    mediana: undefined,
    desviacion: undefined,
  });

  useEffect(() => {
    const get = async () => {
      const numArr = await manipulate.getNums();
      setNumbers(numArr as any);
    };

    get();
  }, []);

  React.useEffect(() => {
    calculate();
  }, [numbers]);

  const calculate = () => {
    let sum: number = 0;
    let numberArray: Array<number> = [];
    numbers.forEach((num) => {
      sum += num.val as number;
      numberArray.push(num.val as number);
    });

    // media
    const media = sum / numbers.length;

    let sortedArray = numberArray.sort();
    let half = numbers.length / 2;
    let mediana = [];
    if (numbers.length % 2 !== 0) {
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
      sumMenosMedia += Math.pow((num.val as number) - media, 2);
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
        <View style={styles.formContainer}>
          <Title title={update.status ? "Actualizando" : "Agregando"} />
          <FormView
            value={update.val}
            setNumArray={setNumbers}
            numArray={numbers}
            update={update}
            setUpdate={setUpdate}
          />
        </View>
        {numbers.length > 0 ? (
          <Results numbers={numbers} results={results} setUpdate={setUpdate} />
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.textMessageBold}>No tienes datos aun</Text>
            <Text style={styles.textMessage}>
              Agrega para ver los resultados
            </Text>
          </View>
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

  formContainer: {
    width: "75%",
    marginTop: 10,
  },

  resultsContainer: {
    width: "70%",
  },

  textMessage: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  textMessageBold: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  messageContainer: {
    backgroundColor: "grey",
    padding: 20,
    marginTop: 40,
    width: "100%",
  },
});
