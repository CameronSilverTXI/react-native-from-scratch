import React, { useEffect, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import { useQuery } from "@tanstack/react-query";
import LoadingOrChildren from "../LoadingOrChildren";
import axiosClient from "@/utils/axiosClient";
import extractIdFromURL from "@/utils/extractId";

type Props = {
    type: string
    updateTitle: (title: string) => void
}

type PokemonListData = {
  name: string,
  pokemon: [{
    pokemon: {
      name: string,
      url: string,
    }
  }]
}

const PokemonList: React.FC<Props> = ({type, updateTitle}: Props) => {

  const { isPending, isError, data: pokemonListData } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => loadPokemonList(),
  })

  const loadPokemonList = async () => {
    const response = await axiosClient.get(`type/${type}`)
    return response.data as PokemonListData
  }

  const {typeName, pokemonList} = useMemo(() => {
    if (!pokemonListData) {
      return { typeName: "Unknown Type", pokemonList: []}
    }
    // Sort the names, alphabetically.
    const pokemonList = pokemonListData.pokemon.sort((itemA, itemB) => (itemA.pokemon.name.localeCompare(itemB.pokemon.name)))
    return { typeName: pokemonListData.name, pokemonList}

  }, [pokemonListData])

  useEffect(() => {
    updateTitle(typeName)
  }, [typeName])

  const overrideMessage = (!pokemonListData || isError) ? "Unable to display Pokémon." : undefined
  
  return (
    <LoadingOrChildren isLoading={isPending} overrideMessage={overrideMessage}>
      <FlashList
          data={pokemonList}
          renderItem={({ item }) => <Item title={item.pokemon.name} id={extractIdFromURL(item.pokemon.url)}/>}
          estimatedItemSize={200}
      />
    </LoadingOrChildren>
  );
}

export default PokemonList;
