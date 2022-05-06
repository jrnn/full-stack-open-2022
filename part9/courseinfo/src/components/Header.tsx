import { FC } from "react";

interface Props {
  header: string
}

const Header: FC<Props> = ({ header }) => (
  <h2>{header}</h2>
);

export default Header;
