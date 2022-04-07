import React, { FormEvent, FunctionComponent } from "react"

interface Props {
  handleChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
}

const Filter: FunctionComponent<Props> = ({ handleChange, value }) => (
  <>
    <label htmlFor="filter">Find countries by name:</label>
    <input
      id="filter"
      onChange={handleChange}
      value={value}
    />
  </>
)

export default Filter
