import React, { FormEvent, FunctionComponent } from "react"

interface Props {
  handleChange: (event: FormEvent<HTMLInputElement>) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  inputValue: string
}

const Form: FunctionComponent<Props> = ({ handleChange, handleSubmit, inputValue }) => (
  <form onSubmit={handleSubmit}>
    <section>
      <label htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        onChange={handleChange}
        value={inputValue}
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
