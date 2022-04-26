import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchUsers } from "../store/users"
import { WaitForMe } from "./WaitForMe"

export const UserMain = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(({ users }) => users.status === "fetching")

  useEffect(() => {
    dispatch(fetchUsers())
  }, [ dispatch ])

  return (isLoading
    ? <WaitForMe />
    :
    <div>
      <h2>Users</h2>
      <Outlet />
    </div>
  )
}
