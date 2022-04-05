import React, { FormEvent, FunctionComponent } from "react"

interface Props {
  editName: (event: FormEvent<HTMLInputElement>) => void
  editPhone: (event: FormEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  name: string
  phone: string
}

const Form: FunctionComponent<Props> = ({ editName, editPhone, handleSubmit, name, phone }) => (
  <form onSubmit={handleSubmit}>
    <section>
      <label htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        onChange={editName}
        value={name}
      />
    </section>
    <section>
      <label htmlFor="phone">
        Phone:
      </label>
      <input
        id="phone"
        onChange={editPhone}
        value={phone}
      />
    </section>
    <section>
      <button type="submit">
        Add
      </button>
    </section>
  </form>
)

export default Form
