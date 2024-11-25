import { postTeam } from "../services";
import { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet, Alert, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";


export default function AddTeam() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalsAmount, setGoalsAmount] = useState("");
  const [points, setPoints] = useState("");
  const [imageURL, setImageURL] = useState("");

  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
  });

  const handleSubmit = async () => {
  const goalCount = parseInt(goalsAmount, 10);
  const pointsCount = parseInt(points, 10);

  if (isNaN(goalCount)) {
    Alert.alert("Error", "La cantidad de goles debe ser un número.");
    return;
  }
  if (isNaN(pointsCount)) {
    Alert.alert("Error", "La cantidad de puntos debe ser un número.");
    return;
  }
  

  await postTeam({
      name: name,
      description: description,
      goals: goalCount,
      points: pointsCount,
      logo: imageURL,
  });

  router.push("/");
};

  return (
    <SafeAreaView style={styles.container}>
      <Text>Nuevo Equipo</Text>
      <TextInput placeholder="name" onChangeText={setName}/>
      <TextInput placeholder="description" onChangeText={setDescription}/>
      <TextInput placeholder="goals amount" onChangeText={setGoalsAmount}/>
      <TextInput placeholder="points" onChangeText={setPoints}/>
      <TextInput placeholder="imageURL" onChangeText={setImageURL}/>
      <Button title='Guardar' onPress={handleSubmit}/>
    </SafeAreaView>
  );
}
