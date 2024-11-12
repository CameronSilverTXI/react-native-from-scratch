import { ColorSchemeName } from "react-native"
import { ColorsDark } from "./dark";
import { ColorsLight } from "./light";

export type Colors = {
    background: string,
    text: string,
}

const ColorScheme = (colorSchemeName: ColorSchemeName): Colors => (
    (colorSchemeName === 'dark') ? ColorsDark : ColorsLight
)

export default ColorScheme;
