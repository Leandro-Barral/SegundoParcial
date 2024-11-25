import { Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function Team({data}:any) {
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        teamImage: {
          width: 50,
          height: 50,
        },
      });
    return(
    <SafeAreaView style={styles.container}>
        <Text onPress={() => {router.push(`/${data.id}`)}}>
            {data.name}
        </Text>
        <TouchableOpacity onPress={() => {router.push(`/${data.id}`)}}>
            <Image
                style={styles.teamImage}
                source={{
                    uri: data.image
                }}
            />
        </TouchableOpacity>
    </SafeAreaView>
    )   
}