import ColorScheme from "@/theme"
import axiosClient from "@/utils/axiosClient"
import { useQuery } from "@tanstack/react-query"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View, SectionList, Image } from "react-native"
import LoadingOrChildren from "../LoadingOrChildren"
import { useEffect, useMemo, useState } from "react"
import Item from "./item"
import SpriteComponent from "./spriteComp"

type Props = {
    id: string
    updateTitle: (title: string) => void
}

type PokemonInfoData = {
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    held_items: [{item: {name: string}}]
    moves: [{move: {name: string}}]
    stats: [
        {
            base_stat: number,
            stat: {name: string},
        }
    ]
    types: [{type: {name: string}}]
    abilities: [{ability: {name: string}}]
    sprites: {
        front_default: string,
        back_default: string
    }
}

export type DataKeyValue = {
    key: string,
    value: string | number,
}

export type DataValue = {
    value: string | number,
}

export type DataItem = DataKeyValue | DataValue

type Section = {
    title: string,
    data: DataItem[],
}

type ImageURLS = {
    front?: string,
    back?: string,
}
  
const PokemonInfo: React.FC<Props> = ({id, updateTitle}: Props) => {

    const [imageSize, setImageSize] = useState<{width: number, height: number}>({width: 0, height: 0})
    const { isPending, isError, data: pokemonInfoData } = useQuery({
        queryKey: ['pokemonInfo', id],
        queryFn: () => loadPokemonInfo(),
    })

    const loadPokemonInfo = async () => {
        const response = await axiosClient.get(`pokemon/${id}`)
        return response.data as PokemonInfoData
    }

    // All the data for the segmented list.
    const {pokemonInfo, imageUrls} = useMemo(() => {

        const pokemonInfo: Section[] = [];
        if (pokemonInfoData) {
            // Set some general info
            pokemonInfo.push({
                title: "General",
                data: [
                    { key: "Name", value: pokemonInfoData.name },
                    { key: "Base Experience", value: pokemonInfoData.base_experience },
                    { key: "Height", value: pokemonInfoData.height },
                    { key: "Weight", value: pokemonInfoData.weight },
                ]
            })

            // All the stats
            if (pokemonInfoData.stats.length > 0) {
                pokemonInfo.push({
                    title: "Stats",
                    data: pokemonInfoData.stats
                        .map((stat) => ({key: stat.stat.name, value: stat.base_stat}))
                        .sort((itemA, itemB) => itemA.key.localeCompare(itemB.key))
                })
            }
            
            // All the abilities
            if (pokemonInfoData.abilities.length > 0) {
                pokemonInfo.push({
                    title: "Abilities",
                    data: pokemonInfoData.abilities
                        .map((ability) => ({value: ability.ability.name}))
                        .sort((itemA, itemB) => itemA.value.localeCompare(itemB.value))
                })
            }

            // All the moves
            if (pokemonInfoData.moves.length > 0) {
                pokemonInfo.push({
                    title: "Moves",
                    data: pokemonInfoData.moves
                        .map((move) => ({value: move.move.name}))
                        .sort((itemA, itemB) => itemA.value.localeCompare(itemB.value))
                })
            }

            // All the types
            if (pokemonInfoData.types.length > 0) {
                pokemonInfo.push({
                    title: "Types",
                    data: pokemonInfoData.types
                        .map((type) => ({value: type.type.name}))
                        .sort((itemA, itemB) => itemA.value.localeCompare(itemB.value))
                })
            }

            // Available items to hold.
            if (pokemonInfoData.held_items.length > 0) {
                pokemonInfo.push({
                    title: "Held Items",
                    data: pokemonInfoData.held_items
                        .map((heldItem) => ({value: heldItem.item.name}))
                        .sort((itemA, itemB) => itemA.value.localeCompare(itemB.value))
                })
            }

        }
        const imageUrls: ImageURLS = {
            front: pokemonInfoData?.sprites.front_default,
            back: pokemonInfoData?.sprites.back_default
        }

        return {pokemonInfo, imageUrls}
    }, [pokemonInfoData])

    useEffect(() => {
        if (pokemonInfoData) {

            // Update the title
            updateTitle(pokemonInfoData.name)
        }
      }, [pokemonInfoData])

    const styles = createStyles(useColorScheme())

    const overrideMessage = (!pokemonInfoData || isError) ? "Unable to display Pokémon info." : undefined
    
    return (
        <LoadingOrChildren isLoading={isPending} overrideMessage={overrideMessage}>
            <SectionList
                sections={pokemonInfo}
                keyExtractor={(item, index) => `${item} + ${index}`}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
                renderItem={({item}) => <Item dataItem={item}/>}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
                SectionSeparatorComponent={() => <View style={styles.sectionSeparator}/>}
                ListHeaderComponent={() => <SpriteComponent url={imageUrls.front}/>}
                ListFooterComponent={() => <SpriteComponent url={imageUrls.back}/>}
            />
        </LoadingOrChildren>
    )
}

export default PokemonInfo

const createStyles = (colorSchemeName: ColorSchemeName) => {

    const colors = ColorScheme(colorSchemeName)
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingVertical: 15,
      },
      sectionSeparator: {
        height: 20
      },
      itemSeparator: {
        height: 10
      },
      text: {
        color: colors.text,
      },
      header: {
        color: colors.text,
      }
    });
}
