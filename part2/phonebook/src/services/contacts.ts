import axios from "axios";
import { Contact } from "../types";

const rootUri = "http://localhost:3001/contacts"

const getAllContacts = (): Promise<Array<Contact>> => {
  return axios
    .get<Array<Contact>>(rootUri)
    .then(response => response.data)
}

const createContact = (name: string, phone: string): Promise<Contact> => {
  const trimmedName = name.trim()
  if (!trimmedName) {
    throw new Error("What kind of a name is that supposed to be?")
  }
  return getAllContacts()
    .then(contacts => contacts.map(contact => contact.name))
    .then(existingNames => existingNames.includes(trimmedName))
    .then(isNameReserved => {
      if (isNameReserved) {
        throw new Error(`${trimmedName} is already present in contacts`)
      }
      const payload = {
        name: trimmedName,
        phone: phone.trim() || "N/A"
      }
      return axios
        .post<Contact>(rootUri, payload)
        .then(response => response.data)
    })
}

const removeContact = (id: number): Promise<void> => {
  return axios.delete(`${rootUri}/${id}`)
}

export default {
  getAllContacts,
  createContact,
  removeContact
}
