import React, { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import LoadingOrChildren from "../LoadingOrChildren";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/utils/axiosClient";
import extractIdFromURL from "@/utils/extractId";

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

  const { isPending, isError, data: pokemonTypesData } = useQuery({
    queryKey: ['types'],
    queryFn: () => loadTypes(),
  })

  const loadTypes = async () => {
    const response = await axiosClient.get("type?limit=50")
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
          renderItem={({ item }) => <Item title={item.name} type={extractIdFromURL(item.url)}/>}
          estimatedItemSize={200}
      />
    </LoadingOrChildren>
  );
}

export default PokemonTypes;
