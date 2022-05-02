import create from "zustand"

const NOTIFICATION_EXPIRY_MS = 5000
const USER_AUTH_KEY = "FSO22_PART8_LIBRARY_WEB_CLIENT_USER_AUTH"

interface Notification {
  type: "info" | "error" | "none"
  message: string
  timer?: number
}

interface Store {
  notification: Notification
  token: string | undefined
  selectedGenre: string
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  checkLocalToken: () => void
  setToken: (token: string) => void
  clearToken: () => void
  setSelectedGenre: (genre: string) => void
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
  token: undefined,
  selectedGenre: "",
  notifySuccess: (message) => {
    setNotification(message, "info", get, set)
  },
  notifyError: (message) => {
    setNotification(message, "error", get, set)
  },
  checkLocalToken: () => {
    const token = window.localStorage.getItem(USER_AUTH_KEY)
    if (token) {
      set({ token })
    }
  },
  setToken: (token) => {
    window.localStorage.setItem(USER_AUTH_KEY, token)
    set({ token })
  },
  clearToken: () => {
    window.localStorage.removeItem(USER_AUTH_KEY)
    set({ token: undefined })
  },
  setSelectedGenre: (genre) => {
    set({ selectedGenre: genre })
  }
}))
