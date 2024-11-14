import { DataItem, DataKeyValue, DataValue } from "."
import ItemKeyValue from "./itemKeyValue"
import ItemValue from "./itemValue"

type Props = {
    dataItem: DataItem
}

const Item: React.FC<Props> = ({dataItem}: Props) => {
    if (("key" in dataItem) && ("value" in dataItem)) {
        return <ItemKeyValue data={dataItem as DataKeyValue} />
    } else if ("value" in dataItem) {
        return <ItemValue data={dataItem as DataValue} />
    }

    return null
}

export default Item
