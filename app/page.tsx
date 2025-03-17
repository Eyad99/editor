/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
const WYSIWYGEditor = dynamic(() => import('../components/WYSIWYGEditor'), {
	ssr: false,
});

export default function Home() {
	const [controlledState, setControlledState] = useState(EditorState.createEmpty());
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	// Fake async content loading
	const loadContent = async () => {
		setLoading(true);
		return new Promise<EditorState>((resolve) => {
			setTimeout(() => {
				const content = EditorState.createWithContent(
					convertFromRaw({
						entityMap: {},
						blocks: [
							{
								key: 'block1',
								text: 'This is fake async content loaded into the editor!',
								type: 'unstyled',
								entityRanges: [],
								depth: 0,
								inlineStyleRanges: [
									{ offset: 0, length: 4, style: 'BOLD' },
									{ offset: 8, length: 5, style: 'ITALIC' },
								],
							},
						],
					})
				);
				resolve(content);
				setLoading(false);
			}, 2000);
		});
	};

	// Fake API save
	const saveContent = async (editorState: EditorState) => {
		setSaving(true);
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				const content = convertToRaw(editorState.getCurrentContent());
				console.log('Fake API call', content);
				setSaving(false);
				resolve();
			}, 1500);
		});
	};

	const handleLoadContent = async () => {
		const newContent = await loadContent();
		setControlledState(newContent);
	};

	const handleSaveContent = async () => {
		await saveContent(controlledState);
	};

	return (
		<main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<h1 className='text-center font-bold text-xl'>WYSIWYG Editor Demo</h1>

			<section style={{ marginBottom: '40px' }}>
				<h2>Controlled Mode</h2>
				<WYSIWYGEditor value={controlledState} onChange={setControlledState} className='custom-editor' />
				{/* Fake an async behaviour and send to a fake api */}
				<div style={{ marginTop: '10px' }}>
					<button
						onClick={handleLoadContent}
						disabled={loading}
						style={{
							padding: '8px 16px',
							marginRight: '10px',
							backgroundColor: loading ? '#ccc' : '#0070f3',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: loading ? 'not-allowed' : 'pointer',
						}}
					>
						{loading ? 'Loading...' : 'Load Async Content'}
					</button>

					<button
						onClick={handleSaveContent}
						disabled={saving}
						style={{
							padding: '8px 16px',
							backgroundColor: saving ? '#ccc' : '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: saving ? 'not-allowed' : 'pointer',
						}}
					>
						{saving ? 'Saving...' : 'Save to Fake API'}
					</button>
				</div>
			</section>

			<section>
				<h2>Uncontrolled Mode</h2>
				<WYSIWYGEditor />
			</section>

			<section style={{ marginTop: '40px' }}>
				<h2>Custom Toolbar</h2>

				<section style={{ marginTop: '40px' }}>
					<h2>Custom Toolbar</h2>
					<WYSIWYGEditor
						renderToolbar={({ editorState, onToggle }) => (
							<div
								style={{
									marginBottom: '10px',
									padding: '4px',
									backgroundColor: '#f5f5f5',
									borderRadius: '4px',
								}}
							>
								<button
									onClick={() => onToggle('BOLD')}
									style={{
										marginRight: '8px',
										padding: '4px 8px',
										border: '1px solid #ccc',
										backgroundColor: editorState.getCurrentInlineStyle().has('BOLD') ? '#e0e0e0' : 'white',
										cursor: 'pointer',
										borderRadius: '2px',
										fontWeight: 'bold',
									}}
								>
									Bold
								</button>
								<button
									onClick={() => onToggle('ITALIC')}
									style={{
										marginRight: '8px',
										padding: '4px 8px',
										border: '1px solid #ccc',
										backgroundColor: editorState.getCurrentInlineStyle().has('ITALIC') ? '#e0e0e0' : 'white',
										cursor: 'pointer',
										borderRadius: '2px',
										fontStyle: 'italic',
									}}
								>
									Italic
								</button>
							</div>
						)}
					/>
				</section>
			</section>
		</main>
	);
}
