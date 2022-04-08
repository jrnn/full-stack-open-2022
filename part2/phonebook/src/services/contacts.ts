import axios from "axios";
import { Contact } from "../types";

const rootUri = "/api/persons"

const getAllContacts = (): Promise<Array<Contact>> => {
  return axios
    .get<Array<Contact>>(rootUri)
    .then(response => response.data)
}

const getByName = (name: string): Promise<Contact | undefined> => {
  return getAllContacts()
    .then(contacts => contacts.find(contact => contact.name === name))
}

const createContact = (name: string, phone: string): Promise<Contact> => {
  const payload = {
    name,
    phone: phone.trim() || "N/A"
  }
  return axios
    .post<Contact>(rootUri, payload)
    .then(response => response.data)
}

const updateContact = (contact: Contact): Promise<Contact> => {
  return axios
    .put<Contact>(`${rootUri}/${contact.id}`, contact)
    .then(response => response.data)
}

const removeContact = (id: number): Promise<void> => {
  return axios.delete(`${rootUri}/${id}`)
}

export default {
  getAllContacts,
  getByName,
  createContact,
  updateContact,
  removeContact
}
