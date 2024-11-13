import React from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import { Stack } from "expo-router";

type Props = {
    type: string
}

const PokemonList: React.FC<Props> = ({type}: Props) => {

  const DATA = Array.from({length: 20}, (_, i) => ({ name: `Pokemon ${i}`}))

  return (
    <>
      <Stack.Screen options={{title: `Type: ${type}`}} />
      <FlashList
          data={DATA}
          renderItem={({ item }) => <Item title={item.name}/>}
          estimatedItemSize={200}
      />
    </>
  );
}

export default PokemonList;
