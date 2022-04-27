import axios from "axios"

interface AsyncApiService<R, I> {
  getAll: (token?: string) => Promise<Array<R>>
  post: (resource: Partial<R>, token?: string) => Promise<R>
  put: (resourse: Partial<R>, id: I, token?: string) => Promise<R>
  delete: (id: I, token?: string) => Promise<void>
}

const bearer = (token?: string) => {
  if (!token) {
    return {}
  }
  return {
    headers: {
      authorization: `bearer ${token}`
    }
  }
}

export const accessApi = <ResourceType = unknown, IdentifierType = string>
  (baseUri: string): AsyncApiService<ResourceType, IdentifierType> =>
{
  return {
    getAll: async (token) => {
      const response = await axios.get<Array<ResourceType>>(baseUri, bearer(token))
      return response.data
    },
    post: async (resource, token) => {
      const response = await axios.post<ResourceType>(baseUri, resource, bearer(token))
      return response.data
    },
    put: async (resource, id, token) => {
      const response = await axios.put<ResourceType>(`${baseUri}/${id}`, resource, bearer(token))
      return response.data
    },
    delete: async (id, token) => {
      await axios.delete(`${baseUri}/${id}`, bearer(token))
    }
  }
}
