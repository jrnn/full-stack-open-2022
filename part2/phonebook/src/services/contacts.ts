import axios from "axios"
import { Contact, ErrorResponse } from "../types"

const rootUri = "/api/persons"

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const { message } = error.response?.data as ErrorResponse
    if (message) {
      return `Oops! Something went wrong: ${message}.`
    }
  }
  return "Oops! Something went wrong, but that's all I can tell you. Sorry!"
}

const getAllContacts = async (): Promise<Array<Contact>> => {
  try {
    const response = await axios.get<Array<Contact>>(rootUri)
    return response.data
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

const getByName = async (name: string): Promise<Contact | undefined> => {
  return getAllContacts()
    .then(contacts => contacts.find(contact => contact.name === name))
}

const createContact = async (name: string, phone: string): Promise<Contact> => {
  try {
    const response = await axios.post<Contact>(rootUri, { name, phone })
    return response.data
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

const updateContact = async (contact: Contact): Promise<Contact> => {
  try {
    const response = await axios.put<Contact>(`${rootUri}/${contact.id}`, contact)
    return response.data
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

const removeContact = async (id: number): Promise<void> => {
  try {
    return await axios.delete(`${rootUri}/${id}`)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

export default {
  getAllContacts,
  getByName,
  createContact,
  updateContact,
  removeContact
}
