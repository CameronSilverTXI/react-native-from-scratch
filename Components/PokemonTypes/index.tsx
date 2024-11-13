import React from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";
import { Stack } from "expo-router";

const PokemonTypes: React.FC = () => {

  const DATA = Array.from({length: 20}, (_, i) => ({ type: `${i}`}))

  return (
    <>
      <Stack.Screen options={{title: "Main"}} />
      <FlashList
          data={DATA}
          renderItem={({ item }) => <Item title={`Option: ${item.type}`} type={item.type}/>}
          estimatedItemSize={200}
      />
    </>
  );
}

export default PokemonTypes;
