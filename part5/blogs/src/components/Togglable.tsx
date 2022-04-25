import React, { ComponentType, useState } from "react"

export interface TogglableProps {
  toggle: () => void
}

export const togglable = <P extends TogglableProps = TogglableProps>(
  label: string,
  WrappedComponent: ComponentType<P>
) => {
  const TogglableComponent = (props: Omit<P, keyof TogglableProps>) => {
    const [ visible, setVisible ] = useState(false)
    const toggle = () => setVisible(!visible)
    const toggleProps = { toggle }

    return (
      <>
        <div style={{ display: visible ? "none" : "" }}>
          <button onClick={toggle}>{label}</button>
        </div>
        <div style={{ display: visible ? "" : "none" }}>
          <WrappedComponent { ...toggleProps } { ...props as P }/>
          <button onClick={toggle}>Close</button>
        </div>
      </>
    )
  }
  return TogglableComponent
}
