import React, { FunctionComponent } from "react"
import { Contact } from "../types"

interface Props {
  contact: Contact
  handleClick: () => void
}

const Entry: FunctionComponent<Props> = ({ contact, handleClick }) => (
  <tr>
    <td>
      {contact.name}
    </td>
    <td>
      {contact.phone}
    </td>
    <td>
      <button onClick={handleClick}>
        Delete
      </button>
    </td>
  </tr>
)

export default Entry
