import { useParams } from "react-router-dom"
import { maybe } from "../util"

export const useParamsId = (): string => {
  const { id } = useParams<{ id: string }>()
  return maybe(id).orElseThrow()
}
