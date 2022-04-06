import React, { FunctionComponent } from "react"
import { Contact } from "../types"

interface Props {
  contact: Contact
}

const Entry: FunctionComponent<Props> = ({ contact }) => (
  <tr>
    <td>
      {contact.name}
    </td>
    <td>
      {contact.phone}
    </td>
  </tr>
)

export default Entry
