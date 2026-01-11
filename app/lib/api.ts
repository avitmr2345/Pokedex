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

export default async function fetchPokemonList(limit = 20): Promise<Pokemon[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    const data = await res.json();

    const detailed = await Promise.all(
        data.results.map(async (p: any) => {
            const r = await fetch(p.url);
            const details = await r.json();
            return {
                name: p.name,
                imageFront: details.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default,
                imageBack: details.sprites.back_default,
                types: details.types,
            } as Pokemon;
        })
    );

    return detailed;
}

export async function fetchPokemonByName(name: string): Promise<any> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon details");
    return res.json();
}
