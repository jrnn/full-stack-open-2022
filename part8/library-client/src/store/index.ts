import create from "zustand"

const NOTIFICATION_EXPIRY_MS = 5000

interface Notification {
  type: "info" | "error" | "none"
  message: string
  timer?: number
}

interface Store {
  notification: Notification
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
}

const emptyNotification: Notification = {
  type: "none",
  message: ""
}

const setNotification = (
  message: string,
  type: "info" | "error",
  getState: () => Store,
  setState: (partial: Partial<Store>) => void
) => {
  const prevTimer = getState().notification.timer
  clearTimeout(prevTimer)

  const timer = window.setTimeout(() => {
    setState({ notification: emptyNotification })
  }, NOTIFICATION_EXPIRY_MS)

  const notification: Notification = { type, message, timer }
  setState({ notification })
}

export const useStore = create<Store>((set, get) => ({
  notification: emptyNotification,
  notifySuccess: (message) => {
    setNotification(message, "info", get, set)
  },
  notifyError: (message) => {
    setNotification(message, "error", get, set)
  }
}))
