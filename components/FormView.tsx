import * as React from "react";
import { View, TextInput, Button } from "react-native";
import { numbersStateType, numberType, updateStateType } from "../App";
import { v4 as uuidv4 } from "uuid";

export interface FormViewProps {
  value: number | undefined;
  setNumArray: (newStateNum: numbersStateType) => void;
  numArray: numbersStateType;
  update: updateStateType;
}

const FormView: React.FunctionComponent<FormViewProps> = ({
  setNumArray,
  numArray,
  update,
}) => {
  const [newData, setNewData] = React.useState<numberType>({
    id: "",
    val: 0,
  });

  const handleSubmit = () => {
    let id;
    update.status ? (id = update.id) : (id = uuidv4());

    setNewData({ ...newData, id });

    if (update.status) {
      let newArray = numArray.filter((num) => update.id != num.id);
      newArray.push(newData);
      setNumArray(newArray);
      setNewData({ id: "", val: 0 });
      // actualizar db
    } else {
      setNumArray([...numArray, newData]);
      // agregar db
    }
  };

  const handleDelete = () => {
    let newArray = numArray.filter((num) => update.id != num.id);
    setNumArray(newArray);
    //   eliminar db
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder={"inserta numero"}
          value={newData.val.toString()}
          onChangeText={(e) => setNewData({ ...newData, val: parseInt(e) })}
        />
      </View>
      <Button
        title={update.status ? "Actualizar" : "Agregar"}
        onPress={handleSubmit}
      />

      {update.status && <Button title="Eliminar" onPress={handleDelete} />}
    </View>
  );
};

export default FormView;
