'use client';

import React, { useState, useEffect, CSSProperties, useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

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
	const [pendingStyle, setPendingStyle] = useState<string | null>(null); // تتبع التنسيق المعلق

	const isControlled = value !== undefined && onChange !== undefined;

	// Controlled Mode
	useEffect(() => {
		if (isControlled && value !== editorState) {
			setEditorState(value);
		}
	}, [value, isControlled]);

	const handleEditorChange = useCallback(
		(newEditorState: EditorState) => {
			let updatedState = newEditorState;
			// إذا كان هناك تنسيق معلق، نطبقه على الحالة الجديدة
			if (pendingStyle && !newEditorState.getCurrentInlineStyle().has(pendingStyle)) {
				updatedState = RichUtils.toggleInlineStyle(newEditorState, pendingStyle);
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
			const currentStyle = editorState.getCurrentInlineStyle();
			const selection = editorState.getSelection();

			if (selection.isCollapsed()) {
				// إذا لم يكن هناك تحديد، نحتفظ بالتنسيق كمعلق
				if (currentStyle.has(style)) {
					setPendingStyle(null); // إلغاء التنسيق إذا كان نشطًا
				} else {
					setPendingStyle(style); // تفعيل التنسيق كمعلق
					const newState = RichUtils.toggleInlineStyle(editorState, style);
					handleEditorChange(newState);
				}
			} else {
				// إذا كان هناك تحديد، نطبق التنسيق مباشرة
				const newState = RichUtils.toggleInlineStyle(editorState, style);
				handleEditorChange(newState);
				setPendingStyle(null); // لا حاجة لتنسيق معلق عند التحديد
			}
		},
		[editorState, handleEditorChange]
	);

	const DefaultToolbar: React.FC<ToolbarProps> = ({ editorState, onToggle }) => {
		const currentStyle = editorState.getCurrentInlineStyle();
		const [pendingStyle, setPendingStyle] = useState<string | null>(null); // إضافة pendingStyle محليًا للاختبار

		const handleToggle = (style: string) => {
			onToggle(style);
			setPendingStyle((prev) => (prev === style ? null : style)); // تحديث pendingStyle محليًا
		};

		return (
			<div className='toolbar'>
				<button
					type='button'
					onClick={() => handleToggle('BOLD')}
					className={`toolbar-button ${currentStyle.has('BOLD') || pendingStyle === 'BOLD' ? 'active' : ''}`}
				>
					Bold
				</button>
				<button
					type='button'
					onClick={() => handleToggle('ITALIC')}
					className={`toolbar-button ${currentStyle.has('ITALIC') || pendingStyle === 'ITALIC' ? 'active' : ''}`}
				>
					Italic
				</button>
				<button
					type='button'
					onClick={() => handleToggle('UNDERLINE')}
					className={`toolbar-button ${currentStyle.has('UNDERLINE') || pendingStyle === 'UNDERLINE' ? 'active' : ''}`}
				>
					Underline
				</button>
				<style jsx>{`
					.toolbar {
						margin-bottom: 10px;
						padding: 4px;
						background-color: #f5f5f5;
						border-radius: 4px;
					}
					.toolbar-button {
						margin-right: 8px;
						padding: 4px 8px;
						border: 1px solid #ccc;
						background-color: white;
						cursor: pointer;
						border-radius: 2px;
						font-weight: bold;
					}
					.toolbar-button.active {
						background-color: #e0e0e0;
					}
				`}</style>
			</div>
		);
	};

	// const DefaultToolbar: React.FC<ToolbarProps> = ({ editorState, onToggle }) => {
	// 	const currentStyle = editorState.getCurrentInlineStyle();
	// 	return (
	// 		<div className='toolbar'>
	// 			<button type='button' onClick={() => onToggle('BOLD')} className={`toolbar-button ${currentStyle.has('BOLD') ? 'active' : ''}`}>
	// 				Bold
	// 			</button>
	// 			<button type='button' onClick={() => onToggle('ITALIC')} className={`toolbar-button ${currentStyle.has('ITALIC') ? 'active' : ''}`}>
	// 				Italic
	// 			</button>
	// 			<button
	// 				type='button'
	// 				onClick={() => onToggle('UNDERLINE')}
	// 				className={`toolbar-button ${currentStyle.has('UNDERLINE') ? 'active' : ''}`}
	// 			>
	// 				Underline
	// 			</button>
	// 			<style jsx>{`
	// 				.toolbar {
	// 					margin-bottom: 10px;
	// 					padding: 4px;
	// 					background-color: #f5f5f5;
	// 					border-radius: 4px;
	// 				}
	// 				.toolbar-button {
	// 					margin-right: 8px;
	// 					padding: 4px 8px;
	// 					border: 1px solid #ccc;
	// 					background-color: white;
	// 					cursor: pointer;
	// 					border-radius: 2px;
	// 					font-weight: bold;
	// 				}
	// 				.toolbar-button.active {
	// 					background-color: #e0e0e0;
	// 				}
	// 			`}</style>
	// 		</div>
	// 	);
	// };

	// const DefaultToolbar: React.FC<ToolbarProps> = ({ editorState, onToggle }) => {
	// 	const currentStyle = editorState.getCurrentInlineStyle();
	// 	return (
	// 		<div
	// 			style={{
	// 				marginBottom: '10px',
	// 				padding: '4px',
	// 				backgroundColor: '#f5f5f5',
	// 				borderRadius: '4px',
	// 			}}
	// 		>
	// 			<button
	// 				type='button'
	// 				onClick={() => onToggle('BOLD')}
	// 				style={{
	// 					marginRight: '8px',
	// 					padding: '4px 8px',
	// 					border: '1px solid #ccc',
	// 					backgroundColor: currentStyle.has('BOLD') ? '#e0e0e0' : 'white',
	// 					cursor: 'pointer',
	// 					borderRadius: '2px',
	// 					fontWeight: 'bold',
	// 				}}
	// 			>
	// 				Bold
	// 			</button>
	// 			<button
	// 				type='button'
	// 				onClick={() => onToggle('ITALIC')}
	// 				style={{
	// 					marginRight: '8px',
	// 					padding: '4px 8px',
	// 					border: '1px solid #ccc',
	// 					backgroundColor: currentStyle.has('ITALIC') ? '#e0e0e0' : 'white',
	// 					cursor: 'pointer',
	// 					borderRadius: '2px',
	// 					fontWeight: 'bold',
	// 				}}
	// 			>
	// 				Italic
	// 			</button>
	// 			<button
	// 				type='button'
	// 				onClick={() => onToggle('UNDERLINE')}
	// 				style={{
	// 					marginRight: '8px',
	// 					padding: '4px 8px',
	// 					border: '1px solid #ccc',
	// 					backgroundColor: currentStyle.has('UNDERLINE') ? '#e0e0e0' : 'white',
	// 					cursor: 'pointer',
	// 					borderRadius: '2px',
	// 					fontWeight: 'bold',
	// 				}}
	// 			>
	// 				Underline
	// 			</button>
	// 		</div>
	// 	);
	// };

	return (
		<div className={`wysiwyg-editor ${className}`} style={style}>
			{renderToolbar ? (
				renderToolbar({ editorState, onToggle: toggleInlineStyle })
			) : (
				<DefaultToolbar editorState={editorState} onToggle={toggleInlineStyle} />
			)}
			<div className='editor-container'>
				<Editor editorState={editorState} onChange={handleEditorChange} handleKeyCommand={handleKeyCommand} />
			</div>
			<style jsx>{`
				.wysiwyg-editor {
					border: 1px solid #ccc;
					padding: 8px;
					border-radius: 4px;
				}
				.editor-container {
					min-height: 200px;
					padding: 8px;
				}
			`}</style>
		</div>
	);
};

export default WYSIWYGEditor;
