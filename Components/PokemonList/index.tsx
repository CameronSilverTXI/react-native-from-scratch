import React, { useEffect, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingOrChildren from "../LoadingOrChildren";

type Props = {
    type: string
    updateTitle: (title: string) => void
}

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

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
    const response = await client.get(`type/${type}`)
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
  
  return (
    <LoadingOrChildren isLoading={isPending}>
      <FlashList
          data={pokemonList}
          renderItem={({ item }) => <Item title={item.pokemon.name}/>}
          estimatedItemSize={200}
      />
    </LoadingOrChildren>
  );
}

export default PokemonList;
