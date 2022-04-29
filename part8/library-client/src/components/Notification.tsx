import { CSSProperties } from "react"
import { useStore } from "../store"

const baseStyle: CSSProperties = {
  border: "2px solid rgb(197 17 17)",
  color: "rgb(197 17 17)",
  fontWeight: "bold",
  padding: "0.5em"
}

const infoStyle: CSSProperties = {
  ...baseStyle,
  border: "2px solid rgb(13 135 13)",
  color: "rgb(13 135 13)"
}

const errorStyle: CSSProperties = {
  ...baseStyle,
  border: "2px solid rgb(197 17 17)",
  color: "rgb(197 17 17)"
}

const Notification = () => {
  const { type, message } = useStore(store => store.notification)
  return (
    type === "none"
      ? null
      :
      <div style={type === "info" ? infoStyle : errorStyle}>
        {message}
      </div>
  )
}

export default Notification
