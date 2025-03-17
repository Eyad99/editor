import React from 'react';

interface ButtonProps {
	onClick: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	backgroundColor: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, backgroundColor }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		style={{
			padding: '8px 16px',
			marginRight: '10px',
			backgroundColor: disabled ? '#ccc' : backgroundColor,
			color: 'white',
			border: 'none',
			borderRadius: '4px',
			cursor: disabled ? 'not-allowed' : 'pointer',
		}}
	>
		{children}
	</button>
);

export default Button;
