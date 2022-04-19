import React, { FunctionComponent } from "react"

interface Props {
  header: string
}

export const Header: FunctionComponent<Props> = ({ header }) => (
  <h2>
    {header}
  </h2>
)
