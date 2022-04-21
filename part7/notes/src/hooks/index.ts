import { FormEvent, useEffect, useState } from "react"
import axios from "axios"

export const useField = (type = "text") => {
  const [ value, setValue ] = useState("")
  const onChange = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    setValue(currentTarget.value)
  }
  return {
    type,
    value,
    onChange
  }
}

interface AsyncResourceService<R> {
  create: (resource: Partial<R>) => Promise<void>
}

export const useResource = <T>(uri: string): [ ReadonlyArray<T>, AsyncResourceService<T> ] => {
  const [ resources, setResources ] = useState<Array<T>>([])
  const service: AsyncResourceService<T> = {
    create: (resource) => {
      return axios
        .post<T>(uri, resource)
        .then(({ data }) => setResources(resources.concat(data)))
    }
  }
  useEffect(() => {
    axios
      .get<Array<T>>(uri)
      .then(({ data }) => setResources(data))
  }, [ uri ])

  return [ resources, service ]
}
