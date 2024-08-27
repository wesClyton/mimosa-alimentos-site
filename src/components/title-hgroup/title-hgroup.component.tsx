import classNames from "classnames"
import styles from "./title-hgroup.module.scss"

interface TitleHgroupProps {
  texth2: string
  texth3: string
  variant: "primary" | "secondary" | "white"
}

export default function TitleHgroup(props: TitleHgroupProps) {
  return (
    <hgroup className={classNames(styles.hgroup, styles[props.variant])}>
      <h2>{props.texth2}</h2>
      <h3>{props.texth3}</h3>
    </hgroup>
  )
}
