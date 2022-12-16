import { parseId } from "../base/base.repository"

function ParseListToObjectId(listIds: string[]){
    return listIds.map((id) => {
        return parseId(id)
    })
}

export {
    ParseListToObjectId
}