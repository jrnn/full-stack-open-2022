import React, { forwardRef, PropsWithChildren, useImperativeHandle, useState } from "react"

type Props = PropsWithChildren<{ label: string }>

export const TogglableElement = forwardRef(({ children, label }: Props, ref) => {
  const [ visible, setVisible ] = useState(false)
  const toggle = () => setVisible(!visible)

  useImperativeHandle(ref, () => ({ toggle }))

  return (
    <>
      <div style={{ display: visible ? "none" : "" }}>
        <button onClick={toggle}>{label}</button>
      </div>
      <div style={{ display: visible ? "" : "none" }}>
        {children}
        <button onClick={toggle}>Close</button>
      </div>
    </>
  )
})
