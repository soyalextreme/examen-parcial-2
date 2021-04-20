import * as React from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { numbersStateType, numberType, updateStateType } from "../types";
import { Colors } from "../constants";
import { v4 as uuidv4 } from "uuid";
import manipulate from "../database/manipulate";

export interface FormViewProps {
  value: number | undefined;
  setNumArray: (newStateNum: numbersStateType) => void;
  numArray: numbersStateType;
  update: updateStateType;
  setUpdate: (newStateUpdate: updateStateType) => void;
}

const FormView: React.FunctionComponent<FormViewProps> = ({
  setNumArray,
  numArray,
  update,
  setUpdate,
}) => {
  React.useEffect(() => {
    if (update.status && update.val) {
      setNum(update.val.toString());
    } else {
      setNum(undefined);
    }
  }, [update]);

  const [num, setNum] = React.useState<string | undefined>();

  const handleSubmit = async () => {
    if (!num) {
      Alert.alert("Ingresa un numero valido, porfavor");
      return;
    }

    if (update.status && update.id) {
      const updatedData: numberType = {
        id: update.id,
        val: parseInt(num),
      };

      let newArray = numArray.filter((num) => update.id !== num.id);
      setNumArray([...newArray, updatedData]);
      setUpdate({ id: "", status: false, val: undefined });
      await manipulate.updateNum(updatedData.id, updatedData.val as number);
      return;
    }

    const newData: numberType = {
      id: uuidv4(),
      val: parseInt(num),
    };
    await manipulate.addNum(parseInt(num), newData.id);
    setNumArray([...numArray, newData]);
    setNum(undefined);
  };

  const handleDelete = async () => {
    let newArray = numArray.filter((num) => update.id !== num.id);
    setNumArray(newArray);
    setUpdate({ id: "", val: undefined, status: false });
    //   eliminar db
    await manipulate.deleteNum(update.id as any);
  };

  return (
    <>
      <TextInput
        placeholder={"inserta numero"}
        keyboardType="numeric"
        value={num}
        onChangeText={(e) => setNum(e)}
        style={styles.form}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={update.status ? "Actualizar" : "Agregar"}
          onPress={handleSubmit}
          color={Colors.green}
        />

        {update.status && (
          <Button title="Eliminar" onPress={handleDelete} color="red" />
        )}
        {update.status && (
          <Button
            title="Cancelar"
            onPress={() => setUpdate({ id: "", status: false, val: undefined })}
            color={Colors.blue}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  form: {
    padding: 10,
    borderRightColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    width: "50%",
    marginBottom: 10,
  },
});

export default FormView;
