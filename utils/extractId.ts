
// Pulls the type-id out of the URL
const extractIdFromURL = (typeURL: string): string => {
    try {
        const pathSplit = new URL(typeURL).pathname.split('/');
        if (pathSplit.length <= 1) {
        return "1"
        }
        return pathSplit[pathSplit.length - 2]
    } catch {
        return "1"
    }
}

export default extractIdFromURL
