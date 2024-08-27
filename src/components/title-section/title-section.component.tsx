import classNames from "classnames"
import styles from "./title-section.module.scss"

interface TitleSectionProps {
  text: string
  variant: "primary" | "secondary" | "white"
}

export default function TitleSection(props: TitleSectionProps) {
  return <h2 className={classNames(styles.title, styles[props.variant])}>{props.text}</h2>
}
