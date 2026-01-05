import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({});

export default function Details() {
  const [pokemonDetail, setPokemonDetail] = useState<any | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    fetchPokemonsByName(params.name as string);
  }, [params.name]);

  async function fetchPokemonsByName(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemonDetail(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {/* <Stack.Screen options={{ title: params.name as string }} />       // property override from the layout.tsx */}
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        <Text>{params.name}</Text>
        {pokemonDetail && (
          <Image
            source={{ uri: pokemonDetail.sprites.front_shiny }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </ScrollView>
    </>
  );
}
