/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, CSSProperties, useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { ToolbarButton } from './ToolbarButton';
import styles from '@/styles/WYSIWYGEditor.module.css';

interface WYSIWYGEditorProps {
	value?: EditorState;
	onChange?: (editorState: EditorState) => void;
	className?: string;
	style?: CSSProperties;
	renderToolbar?: (props: ToolbarProps) => React.ReactNode;
}

interface ToolbarProps {
	editorState: EditorState;
	onToggle: (style: string) => void;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ value, onChange, className = '', style, renderToolbar }) => {
	const [editorState, setEditorState] = useState(() => value || EditorState.createEmpty());
	const [pendingStyle, setPendingStyle] = useState<string | null>(null);

	const isControlled = value !== undefined && onChange !== undefined;

	// Sync editor state in controlled mode
	useEffect(() => {
		if (isControlled && value !== editorState) {
			setEditorState(value);
		}
	}, [value, isControlled]);

	const handleEditorChange = useCallback(
		(newEditorState: EditorState) => {
			let updatedState = newEditorState;
			const selection = newEditorState.getSelection();

			// If there is a pendingStyle and the text is not selected, apply the pending style
			if (pendingStyle && selection.isCollapsed()) {
				// Check if the pending style is not active, and apply it
				if (!newEditorState.getCurrentInlineStyle().has(pendingStyle)) {
					updatedState = RichUtils.toggleInlineStyle(newEditorState, pendingStyle);
				}
			}

			setEditorState(updatedState);
			if (onChange) {
				onChange(updatedState);
			}
		},
		[pendingStyle, onChange]
	);

	const handleKeyCommand = useCallback(
		(command: string) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				handleEditorChange(newState);
				return 'handled';
			}
			return 'not-handled';
		},
		[editorState, handleEditorChange]
	);

	const toggleInlineStyle = useCallback(
		(style: string) => {
			const selection = editorState.getSelection();

			if (selection.isCollapsed()) {
				setPendingStyle(pendingStyle === style ? null : style);
				const newState = RichUtils.toggleInlineStyle(editorState, style);
				handleEditorChange(newState);

				return;
			}

			const newState = RichUtils.toggleInlineStyle(editorState, style);
			setPendingStyle(null);
			handleEditorChange(newState);
		},
		[editorState, pendingStyle, handleEditorChange]
	);

	const DefaultToolbar: React.FC<ToolbarProps> = ({ editorState, onToggle }) => {
		const currentStyle = editorState.getCurrentInlineStyle();
		return (
			<div className={styles.toolbar}>
				<ToolbarButton label='Bold' style='BOLD' active={currentStyle.has('BOLD')} onToggle={onToggle} />
				<ToolbarButton label='Italic' style='ITALIC' active={currentStyle.has('ITALIC')} onToggle={onToggle} />
				<ToolbarButton label='Underline' style='UNDERLINE' active={currentStyle.has('UNDERLINE')} onToggle={onToggle} />
			</div>
		);
	};

	return (
		<div className={`${styles.editor} ${className}`} style={style}>
			{renderToolbar ? (
				renderToolbar({ editorState, onToggle: toggleInlineStyle })
			) : (
				<DefaultToolbar editorState={editorState} onToggle={toggleInlineStyle} />
			)}
			<div className={styles.editorContainer}>
				<Editor editorState={editorState} onChange={handleEditorChange} handleKeyCommand={handleKeyCommand} aria-label='Rich Text Editor' />
			</div>
		</div>
	);
};

export default WYSIWYGEditor;
