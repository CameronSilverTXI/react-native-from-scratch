import React, { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import LoadingOrChildren from "../LoadingOrChildren";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

type PokemonTypesData = {
  count: number,
  next?: string,
  previous?: string,
  results: [
    {
      name: string,
      url: string,
    }
  ]
}

const PokemonTypes: React.FC = () => {

  const DATA = Array.from({length: 20}, (_, i) => ({ type: `${i + 1}`}))

  const { isPending, isError, data: pokemonTypesData } = useQuery({
    queryKey: ['types'],
    queryFn: () => loadTypes(),
  })

  const loadTypes = async () => {
    const response = await client.get("type?limit=50")
    return response.data as PokemonTypesData
  }

  const pokemonTypes = useMemo(() => {
    if (!pokemonTypesData) {
      return []
    }
    // Sort the types, alphabetically.
    return pokemonTypesData.results.sort((itemA, itemB) => (itemA.name.localeCompare(itemB.name)))
  }, [pokemonTypesData])

  const overrideMessage = (!pokemonTypesData || isError) ? "Unable to display Pokémon types." : undefined
  
  return (
    <LoadingOrChildren isLoading={isPending} overrideMessage={overrideMessage}>
      <FlashList
          data={pokemonTypes}
          renderItem={({ item }) => <Item title={item.name} type={item.name}/>}
          estimatedItemSize={200}
      />
    </LoadingOrChildren>
  );
}

export default PokemonTypes;
