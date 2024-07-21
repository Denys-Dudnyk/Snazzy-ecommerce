import styles from './Tooltip.module.scss'
const Tooltip = ({ text }: { text: string }) => {
	return (
		<div className={styles.tooltip__inner}>
			<span className={styles.tooltip__text}>{text}</span>
		</div>
	)
}
export default Tooltip
