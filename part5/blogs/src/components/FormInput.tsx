import TextField from "@mui/material/TextField"
import React, { ChangeEventHandler, FunctionComponent, HTMLInputTypeAttribute } from "react"

interface Props {
  label: string
  loading?: boolean
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement>
  type: HTMLInputTypeAttribute
}

export const FormInput: FunctionComponent<Props> = ({ label, value, handleChange, type, loading = false }) => (
  <div>
    <TextField
      disabled={loading}
      fullWidth
      id={`${label.toLowerCase().trim()}-input`}
      label={label}
      margin="dense"
      onChange={handleChange}
      type={type}
      value={value}
      variant="outlined"
    />
  </div>
)
