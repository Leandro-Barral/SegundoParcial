import { getTeams } from "../services";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Dimensions } from "react-native";
import Team from "../components/Team";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const [teams, setTeams] = useState<any[]>([]);
  const [originalTeams, setOriginalTeams] = useState<any[]>([]);

  const fetchTeams = async () => {
    const fetchedTeams = await getTeams();
    setTeams(fetchedTeams);
    setOriginalTeams(fetchedTeams);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const sortTeamsByPoints = () => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    setTeams(sortedTeams);
  };

  const resetTeamsOrder = () => {
    setTeams(originalTeams);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          Platform.OS === "android" ? styles.androidAlignment : styles.iosAlignment,
        ]}
        onPress={() => {
          router.push("/addTeam");
        }}
      >
        <Text
          style={Platform.select({
            android: styles.androidText,
            ios: styles.iosText,
          })}
        >
          {Platform.OS === "android" ? "Nuevo Equipo" : "Crear Equipo"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sortButton]}
        onPress={sortTeamsByPoints}
      >
        <Text style={styles.buttonText}>Ordenar por Puntos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.resetButton]}
        onPress={resetTeamsOrder}
      >
        <Text style={styles.buttonText}>Restablecer Orden</Text>
      </TouchableOpacity>

      {teams.map((team: any) => (
        <Team key={team.id} data={team} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.85
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  androidAlignment: {
    alignSelf: "flex-start",
    backgroundColor: "blue",
  },
  iosAlignment: {
    alignSelf: "flex-end",
    backgroundColor: "green",
  },
  androidText: {
    color: "white",
    textAlign: "center",
  },
  iosText: {
    color: "black",
    textAlign: "center",
  },
  sortButton: {
    backgroundColor: "orange",
    width: "80%",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "red",
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
