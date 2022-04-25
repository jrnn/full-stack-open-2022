import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { fetchUsers } from "../store/users"

export const UserMain = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [ dispatch ])

  return (status === "pending"
    ? <div>... LOADING ...</div>
    :
    <div>
      <h2>Users</h2>
      <Outlet />
    </div>
  )
}
