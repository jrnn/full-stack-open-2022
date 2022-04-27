import React, { FunctionComponent, MouseEventHandler } from "react"
import LoadingButton from "@mui/lab/LoadingButton"

interface Props {
  label: string
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
}

export const Button: FunctionComponent<Props> = ({ label, loading = false, onClick, type = "button" }) => (
  <LoadingButton
    disabled={loading}
    fullWidth
    id={`${label.toLowerCase().trim()}-button`}
    loading={loading}
    onClick={onClick}
    type={type}
    variant="outlined"
  >
    {label}
  </LoadingButton>
)
