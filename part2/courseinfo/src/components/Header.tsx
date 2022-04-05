import React, { FunctionComponent } from "react"

interface Props {
  header: string
}

const Header: FunctionComponent<Props> = ({ header }) => (
  <h1>
    {header}
  </h1>
)

export default Header
