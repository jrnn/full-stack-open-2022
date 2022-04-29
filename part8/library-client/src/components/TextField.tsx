import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react"

interface Props {
  label: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type: HTMLInputTypeAttribute
  value: string
}

const TextField: FC<Props> = ({ label, onChange, type, value }) => {
  const id = `${label.trim().toLowerCase()}-input`
  return (
    <>
      <label htmlFor={id}>{label}&nbsp;</label>
      <input
        id={id}
        onChange={onChange}
        type={type}
        value={value}
      />
    </>
  )
}

export default TextField
