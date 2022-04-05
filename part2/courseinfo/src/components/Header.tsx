import React, { FunctionComponent } from "react"

interface Props {
  header: string
}

const Header: FunctionComponent<Props> = ({ header }) => (
  <h2>
    {header}
  </h2>
)

export default Header
