import React, { FunctionComponent } from "react"

interface Props {
  label: string
  handleClick: () => void
}

export const Button: FunctionComponent<Props> = ({ label, handleClick }) => (
  <button onClick={handleClick}>
    {label}
  </button>
)
