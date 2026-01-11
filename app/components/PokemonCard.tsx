import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  imageFront: string | null;
  imageBack: string | null;
  types: PokemonType[];
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#fc6c6d",
  water: "#76befe",
  electric: "#F7D02C",
  grass: "#49d0b2",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonCard({
  pokemon,
  style,
}: {
  pokemon: Pokemon;
  style?: any;
}) {
  const mainType = pokemon.types?.[0]?.type?.name ?? "normal";
  const bg = (colorsByType[mainType] ?? "#DDD") + 70;

  return (
    // asChild means “Do NOT render your own UI. Instead, give your navigation behavior to the child component.” asChild tells the Link: “don’t render your internal View; just let your child be the root.”
    <Link
      href={{ pathname: "/details", params: { name: pokemon.name } }}
      style={{
        backgroundColor: bg,
        padding: 10,
        minWidth: 180,
        borderRadius: 20,
      }}
      asChild
    >
      <Pressable style={[styles.card, style]}>
        <View style={{ flex: 1 }}>
          <View style={styles.tagRow}>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>{pokemon.types[0].type.name}</Text>
            </View>
          </View>

          <Image
            source={{ uri: pokemon.imageFront ?? undefined }}
            style={styles.image}
            resizeMode="contain"
            accessible
            accessibilityLabel={`${pokemon.name} sprite`}
          />
        </View>
      </Pressable>
    </Link>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 110,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    bottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeTag: {
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#222",
    textTransform: "capitalize",
  },
});
