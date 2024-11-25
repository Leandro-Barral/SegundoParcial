import { getTeam, deleteTeam, putTeam } from "../services";
import { useEffect, useState } from "react";
import { Text, View, Button, Image, StyleSheet, TextInput, Alert, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function TeamDetails() {

  const {id} = useLocalSearchParams();
  const [Team, setTeam] = useState<any>({});
  const [editing, setEditing] = useState<any>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goalsAmount, setGoalsAmount] = useState("");
  const [points, setPoints] = useState("");
  const [imageURL, setImageURL] = useState("");

  const router = useRouter();

  const fetchTeam = async () => {
    setTeam(await getTeam(id));
  }
  useEffect(() => { fetchTeam(); }, [])

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    TeamImage: {
      width: 50,
      height: 50,
    },
  });

  const handleDelete = async () => {
    await deleteTeam(Team.id)
    router.push("/");
  }

  const handleEdit = () => {
    setEditing(true);
  }

  const saveChanges = async () => {
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
  
    setEditing(false);
    await putTeam({
      id: id,
      name: name,
      description: description,
      goals: goalCount,
      points: pointsCount,
      logo: imageURL,
    });
  
    router.push(`/${Team.id}`);
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text>{Team.name} Details</Text>
      <Image
            style={styles.TeamImage}
            source={{
                uri: Team.image
            }}
        />
      <Text>Description: {Team.description}</Text>
      <Text>Goals Amount: {Team.goals}</Text>
      <Text>Points: {Team.points}</Text>
      <Button 
          title='Delete'
          onPress={handleDelete}
      />
      <Button 
        title='Edit'
        onPress={handleEdit}
      />

      {editing && 
      <View>
        <Text>Editar Equipo</Text>
        <TextInput placeholder="name" onChangeText={setName}/>
        <TextInput placeholder="description" onChangeText={setDescription}/>
        <TextInput placeholder="goals amount" onChangeText={setGoalsAmount}/>
        <TextInput placeholder="points" onChangeText={setPoints}/>
        <TextInput placeholder="imageURL" onChangeText={setImageURL}/>
        <Button 
            title='Guardar'
            onPress={saveChanges}
        />
        
      </View>
      }
    </SafeAreaView>
  );
}

