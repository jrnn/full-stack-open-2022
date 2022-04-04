import React, { FunctionComponent } from "react"

interface Props {
  total: number
}

const Total: FunctionComponent<Props> = ({ total }) => {
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

export default Total
