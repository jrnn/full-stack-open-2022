import React, { CSSProperties } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppState } from "../store"

const notificationStyle: CSSProperties = {
  color: "white",
  fontSize: 17,
  padding: 10
}

const infoStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "green"
}

const errorStyle: CSSProperties = {
  ...notificationStyle,
  backgroundColor: "maroon"
}

const mapStateToProps = (state: AppState) => state.notification
const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export const Notification = connector(({ type, message }: Props) => {
  // const { type, message } = useAppSelector(state => state.notification)
  return (
    type === "none"
      ? null
      :
      <div
        id={`notification-${type}`}
        style={type === "info" ? infoStyle : errorStyle}
      >
        {message}
      </div>
  )
})
