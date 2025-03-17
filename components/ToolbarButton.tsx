import styles from '@/styles/WYSIWYGEditor.module.css';

export const ToolbarButton: React.FC<{
	label: string;
	style: string;
	active: boolean;
	onToggle: (style: string) => void;
}> = ({ label, style, active, onToggle }) => (
	<button
		type='button'
		onClick={() => onToggle(style)}
		className={`${styles.toolbarButton} ${active ? styles.active : ''}`}
		aria-pressed={active}
	>
		{label}
	</button>
);
