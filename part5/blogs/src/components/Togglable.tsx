import React, { ComponentType, useState } from "react"
import { Button } from "./Button"

export interface TogglableProps {
  label: string
  toggle: () => void
}

export const togglable = <P extends TogglableProps = TogglableProps>(
  WrappedComponent: ComponentType<P>
) => {
  const TogglableComponent = ({ label, ...props }: Omit<P, "toggle">) => {
    const [ visible, setVisible ] = useState(false)
    const toggle = () => setVisible(!visible)
    const toggleProps = { toggle }

    return (
      <>
        <div style={{ display: visible ? "none" : "" }}>
          <Button label={label} onClick={toggle} />
        </div>
        <div style={{ display: visible ? "" : "none" }}>
          <WrappedComponent { ...toggleProps } { ...props as P }/>
          <Button label="Close" onClick={toggle} />
        </div>
      </>
    )
  }
  return TogglableComponent
}
