import React from "react"
import Alert from "@mui/material/Alert"
import { useAppSelector } from "../store"

export const Notification = () => {
  const { type, message } = useAppSelector(state => state.notification)
  return (
    type === "none"
      ? null
      :
      <Alert
        id={`notification-${type}`}
        icon={false}
        severity={type === "info" ? "success" : "error"}
        variant="outlined"
      >
        {message}
      </Alert>
  )
}
