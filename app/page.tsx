'use client';

import React, { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import styles from '@/styles/Home.module.css';

const WYSIWYGEditor = dynamic(() => import('../components/WYSIWYGEditor'), {
	ssr: false,
	loading: () => <div className={styles.emptySection}>Loading ...</div>,
});

const LOAD_DELAY = 2000;
const SAVE_DELAY = 1500;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const ControlledEditorSection: React.FC = () => {
	const [controlledState, setControlledState] = useState(EditorState.createEmpty());
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	const loadContent = async () => {
		setLoading(true);
		try {
			await delay(LOAD_DELAY);
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
			setControlledState(content);
		} catch (error) {
			console.error('Failed to load content:', error);
		} finally {
			setLoading(false);
		}
	};

	const saveContent = async (editorState: EditorState) => {
		setSaving(true);
		try {
			await delay(SAVE_DELAY);
			const content = convertToRaw(editorState.getCurrentContent());
			console.log('Fake API call', content);
		} catch (error) {
			console.error('Failed to save content:', error);
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className={styles.section}>
			<h2>Controlled Mode</h2>
			<WYSIWYGEditor value={controlledState} onChange={setControlledState} className='custom-editor' />
			<div className={styles.buttonGroup}>
				<Button onClick={loadContent} disabled={loading} backgroundColor='#0070f3'>
					{loading ? 'Loading...' : 'Load Async Content'}
				</Button>
				<Button onClick={() => saveContent(controlledState)} disabled={saving} backgroundColor='#28a745'>
					{saving ? 'Saving...' : 'Save to Fake API'}
				</Button>
			</div>
		</section>
	);
};

const UncontrolledEditorSection: React.FC = () => (
	<section className={styles.section}>
		<h2>Uncontrolled Mode</h2>
		<WYSIWYGEditor />
	</section>
);

const CustomToolbarSection: React.FC = () => (
	<section className={styles.section}>
		<h2>Custom Toolbar</h2>
		<WYSIWYGEditor
			renderToolbar={({ editorState, onToggle }) => (
				<div className={styles.customToolbar}>
					<button
						onClick={() => onToggle('BOLD')}
						className={`${styles.toolbarButton} ${editorState.getCurrentInlineStyle().has('BOLD') ? styles.toolbarButtonActive : ''} ${
							styles.bold
						}`}
					>
						Bold
					</button>
					<button
						onClick={() => onToggle('ITALIC')}
						className={`${styles.toolbarButton} ${editorState.getCurrentInlineStyle().has('ITALIC') ? styles.toolbarButtonActive : ''} ${
							styles.italic
						}`}
					>
						Italic
					</button>
				</div>
			)}
		/>
	</section>
);
export default function Home() {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>WYSIWYG Editor Demo</h1>
			<ControlledEditorSection />
			<UncontrolledEditorSection />
			<CustomToolbarSection />
		</main>
	);
}
