import React, { FunctionComponent } from "react"

interface Props {
  label: string
  handleClick: () => void
}

const Button: FunctionComponent<Props> = ({ label, handleClick }) => (
  <button onClick={handleClick}>
    {label}
  </button>
)

export default Button
