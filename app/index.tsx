import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PokemonCard from "./components/PokemonCard";
import fetchPokemonList, { Pokemon } from "./lib/api";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const list = await fetchPokemonList(100);
      setPokemons(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const filtered = pokemons.filter((p) =>
    p.name.includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.header}>Pokedex</Text>

      <TextInput
        placeholder="Search by Pokemon's name"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
          marginBottom: 22,
        }}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} style={{ width: "48%" }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  search: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    borderRadius: 8,
    marginBottom: 28,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
