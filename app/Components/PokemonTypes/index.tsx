import React from "react";
import { FlashList } from "@shopify/flash-list";
import Item from "./item";

const PokemonTypes: React.FC = () => {

  const DATA = Array.from({length: 20}, (_, i) => ({ title: `Option ${i}`}))

  return (
    <FlashList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title}/>}
        estimatedItemSize={200}
    />
  );
}

export default PokemonTypes;
