/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import WYSIWYGEditor from '@/components/WYSIWYGEditor';
// import '@testing-library/jest-dom'; // لدعم toHaveClass
// import { render, screen, fireEvent } from '@testing-library/react';
// import { EditorState, ContentState, SelectionState, Modifier } from 'draft-js';

// describe('WYSIWYGEditor Toolbar', () => {
// 	it('toggles BOLD style when Bold button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const boldButton = screen.getByText('Bold');

// 		// النقر الأول: تفعيل Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).toHaveClass('active');

// 		// النقر الثاني: إلغاء Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).not.toHaveClass('active');
// 	});

// 	it('toggles ITALIC style when Italic button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const italicButton = screen.getByText('I');

// 		// النقر الأول: تفعيل Italic
// 		fireEvent.click(italicButton);
// 		expect(italicButton).toHaveClass('active');

// 		// النقر الثاني: إلغاء Italic
// 		fireEvent.click(italicButton);
// 		expect(italicButton).not.toHaveClass('active');
// 	});

// 	it('toggles UNDERLINE style when Underline button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const underlineButton = screen.getByText('U');

// 		// النقر الأول: تفعيل Underline
// 		fireEvent.click(underlineButton);
// 		expect(underlineButton).toHaveClass('active');

// 		// النقر الثاني: إلغاء Underline
// 		fireEvent.click(underlineButton);
// 		expect(underlineButton).not.toHaveClass('active');
// 	});

// 	it('applies BOLD style to selected text', () => {
// 		const content = ContentState.createFromText('Hello');
// 		const selection = SelectionState.createEmpty(content.getFirstBlock().getKey()).merge({
// 			anchorOffset: 0,
// 			focusOffset: 5, // تحديد "Hello" بالكامل
// 		});
// 		const initialState = EditorState.createWithContent(content);
// 		const editorStateWithSelection = EditorState.acceptSelection(initialState, selection);

// 		render(<WYSIWYGEditor value={editorStateWithSelection} />);
// 		const boldButton = screen.getByText('B');

// 		// النقر على Bold مع تحديد
// 		fireEvent.click(boldButton);

// 		const editor = screen.getByRole('textbox') as any;
// 		const updatedState = editor.editorState as EditorState;
// 		const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 		expect(styles.has('BOLD')).toBe(true);
// 		expect(boldButton).toHaveClass('active');

// 		// إلغاء التنسيق
// 		fireEvent.click(boldButton);
// 		const finalState = editor.editorState as EditorState;
// 		const finalStyles = finalState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 		expect(finalStyles.has('BOLD')).toBe(false);
// 		expect(boldButton).not.toHaveClass('active');
// 	});

// 	it('applies BOLD style to new text after toggling', () => {
// 		const { rerender } = render(<WYSIWYGEditor />);
// 		const boldButton = screen.getByText('B');
// 		const editor = screen.getByRole('textbox') as any;

// 		// تفعيل Bold
// 		fireEvent.click(boldButton);

// 		// محاكاة الكتابة باستخدام Modifier.insertText
// 		const currentState = editor.editorState as EditorState;
// 		const currentContent = currentState.getCurrentContent();
// 		const currentSelection = currentState.getSelection();
// 		const newContent = Modifier.insertText(currentContent, currentSelection, 'Test', currentState.getCurrentInlineStyle());
// 		const newState = EditorState.push(currentState, newContent, 'insert-characters');

// 		editor.editorState = newState;
// 		rerender(<WYSIWYGEditor value={newState} />);

// 		const updatedState = editor.editorState as EditorState;
// 		const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 		expect(styles.has('BOLD')).toBe(true);
// 	});

// 	it('updates controlled state when toggling BOLD', () => {
// 		const mockOnChange = jest.fn();
// 		const initialState = EditorState.createEmpty();
// 		render(<WYSIWYGEditor value={initialState} onChange={mockOnChange} />);
// 		const boldButton = screen.getByText('B');

// 		fireEvent.click(boldButton);
// 		expect(mockOnChange).toHaveBeenCalled();
// 		const updatedState = mockOnChange.mock.calls[0][0] as EditorState;
// 		expect(updatedState.getCurrentInlineStyle().has('BOLD')).toBe(true);
// 	});
// });

// describe('Check Array is a number', () => {
// 	test('return number', () => {
// 		expect(isNaN(1)).toBeFalsy();
// 	});
// });

// import WYSIWYGEditor from '@/components/WYSIWYGEditor';
// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';

// describe('WYSIWYGEditor Toolbar', () => {
// 	// اختبار تفعيل/إلغاء BOLD بدون تحديد
// 	it('toggles BOLD style when Bold button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const boldButton = screen.getByText('Bold');

// 		// النقر الأول: تفعيل Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).toHaveStyle('background-color: #e0e0e0');

// 		// النقر الثاني: إلغاء Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).toHaveStyle('background-color: white');
// 	});

// // اختبار تفعيل/إلغاء ITALIC بدون تحديد
// it('toggles ITALIC style when Italic button is clicked with no selection', () => {
// 	render(<WYSIWYGEditor />);
// 	const italicButton = screen.getByText('Italic');

// 	// النقر الأول: تفعيل Italic
// 	fireEvent.click(italicButton);
// 	expect(italicButton).toHaveStyle('background-color: #e0e0e0');

// 	// النقر الثاني: إلغاء Italic
// 	fireEvent.click(italicButton);
// 	expect(italicButton).toHaveStyle('background-color: white');
// });

// اختبار تفعيل/إلغاء UNDERLINE بدون تحديد
// it('toggles UNDERLINE style when Underline button is clicked with no selection', () => {
// 	render(<WYSIWYGEditor />);
// 	const underlineButton = screen.getByText('Underline');

// 	// النقر الأول: تفعيل Underline
// 	fireEvent.click(underlineButton);
// 	expect(underlineButton).toHaveStyle('background-color: #e0e0e0');

// 	// النقر الثاني: إلغاء Underline
// 	fireEvent.click(underlineButton);
// 	expect(underlineButton).toHaveStyle('background-color: white');
// });

// // اختبار تطبيق BOLD على نص محدد
// it('applies BOLD style to selected text', () => {
// 	const content = ContentState.createFromText('Hello');
// 	const selection = SelectionState.createEmpty(content.getFirstBlock().getKey()).merge({
// 		anchorOffset: 0,
// 		focusOffset: 5, // تحديد "Hello" بالكامل
// 	});
// 	const initialState = EditorState.createWithContent(content);
// 	const editorStateWithSelection = EditorState.acceptSelection(initialState, selection);

// 	render(<WYSIWYGEditor value={editorStateWithSelection} />);
// 	const boldButton = screen.getByText('Bold');

// 	// النقر على Bold مع تحديد
// 	fireEvent.click(boldButton);

// 	const editor = screen.getByRole('textbox') as any;
// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('BOLD')).toBe(true);
// 	expect(boldButton).toHaveStyle('background-color: #e0e0e0');

// 	// إلغاء التنسيق
// 	fireEvent.click(boldButton);
// 	const finalState = editor.editorState as EditorState;
// 	const finalStyles = finalState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(finalStyles.has('BOLD')).toBe(false);
// 	expect(boldButton).toHaveStyle('background-color: white');
// });

// // اختبار تطبيق ITALIC على نص محدد
// it('applies ITALIC style to selected text', () => {
// 	const content = ContentState.createFromText('Hello');
// 	const selection = SelectionState.createEmpty(content.getFirstBlock().getKey()).merge({
// 		anchorOffset: 0,
// 		focusOffset: 5,
// 	});
// 	const initialState = EditorState.createWithContent(content);
// 	const editorStateWithSelection = EditorState.acceptSelection(initialState, selection);

// 	render(<WYSIWYGEditor value={editorStateWithSelection} />);
// 	const italicButton = screen.getByText('Italic');

// 	fireEvent.click(italicButton);

// 	const editor = screen.getByRole('textbox') as any;
// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('ITALIC')).toBe(true);
// 	expect(italicButton).toHaveStyle('background-color: #e0e0e0');

// 	fireEvent.click(italicButton);
// 	const finalState = editor.editorState as EditorState;
// 	const finalStyles = finalState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(finalStyles.has('ITALIC')).toBe(false);
// 	expect(italicButton).toHaveStyle('background-color: white');
// });

// // اختبار تطبيق UNDERLINE على نص محدد
// it('applies UNDERLINE style to selected text', () => {
// 	const content = ContentState.createFromText('Hello');
// 	const selection = SelectionState.createEmpty(content.getFirstBlock().getKey()).merge({
// 		anchorOffset: 0,
// 		focusOffset: 5,
// 	});
// 	const initialState = EditorState.createWithContent(content);
// 	const editorStateWithSelection = EditorState.acceptSelection(initialState, selection);

// 	render(<WYSIWYGEditor value={editorStateWithSelection} />);
// 	const underlineButton = screen.getByText('Underline');

// 	fireEvent.click(underlineButton);

// 	const editor = screen.getByRole('textbox') as any;
// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('UNDERLINE')).toBe(true);
// 	expect(underlineButton).toHaveStyle('background-color: #e0e0e0');

// 	fireEvent.click(underlineButton);
// 	const finalState = editor.editorState as EditorState;
// 	const finalStyles = finalState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(finalStyles.has('UNDERLINE')).toBe(false);
// 	expect(underlineButton).toHaveStyle('background-color: white');
// });

// // اختبار تطبيق BOLD على نص جديد
// it('applies BOLD style to new text after toggling', () => {
// 	const { rerender } = render(<WYSIWYGEditor />);
// 	const boldButton = screen.getByText('Bold');
// 	const editor = screen.getByRole('textbox') as any;

// 	// تفعيل Bold
// 	fireEvent.click(boldButton);

// 	// محاكاة الكتابة
// 	const currentState = editor.editorState as EditorState;
// 	const currentContent = currentState.getCurrentContent();
// 	const currentSelection = currentState.getSelection();
// 	const newContent = Modifier.insertText(currentContent, currentSelection, 'Test', currentState.getCurrentInlineStyle());
// 	const newState = EditorState.push(currentState, newContent, 'insert-characters');

// 	editor.editorState = newState;
// 	rerender(<WYSIWYGEditor value={newState} />);

// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('BOLD')).toBe(true);
// });

// // اختبار تطبيق ITALIC على نص جديد
// it('applies ITALIC style to new text after toggling', () => {
// 	const { rerender } = render(<WYSIWYGEditor />);
// 	const italicButton = screen.getByText('Italic');
// 	const editor = screen.getByRole('textbox') as any;

// 	fireEvent.click(italicButton);

// 	const currentState = editor.editorState as EditorState;
// 	const currentContent = currentState.getCurrentContent();
// 	const currentSelection = currentState.getSelection();
// 	const newContent = Modifier.insertText(currentContent, currentSelection, 'Test', currentState.getCurrentInlineStyle());
// 	const newState = EditorState.push(currentState, newContent, 'insert-characters');

// 	editor.editorState = newState;
// 	rerender(<WYSIWYGEditor value={newState} />);

// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('ITALIC')).toBe(true);
// });

// // اختبار تطبيق UNDERLINE على نص جديد
// it('applies UNDERLINE style to new text after toggling', () => {
// 	const { rerender } = render(<WYSIWYGEditor />);
// 	const underlineButton = screen.getByText('Underline');
// 	const editor = screen.getByRole('textbox') as any;

// 	fireEvent.click(underlineButton);

// 	const currentState = editor.editorState as EditorState;
// 	const currentContent = currentState.getCurrentContent();
// 	const currentSelection = currentState.getSelection();
// 	const newContent = Modifier.insertText(currentContent, currentSelection, 'Test', currentState.getCurrentInlineStyle());
// 	const newState = EditorState.push(currentState, newContent, 'insert-characters');

// 	editor.editorState = newState;
// 	rerender(<WYSIWYGEditor value={newState} />);

// 	const updatedState = editor.editorState as EditorState;
// 	const styles = updatedState.getCurrentContent().getFirstBlock().getInlineStyleAt(0);
// 	expect(styles.has('UNDERLINE')).toBe(true);
// });

// // اختبار تحديث الحالة في الوضع المُدار
// it('updates controlled state when toggling BOLD', () => {
// 	const mockOnChange = jest.fn();
// 	const initialState = EditorState.createEmpty();
// 	render(<WYSIWYGEditor value={initialState} onChange={mockOnChange} />);
// 	const boldButton = screen.getByText('Bold');

// 	fireEvent.click(boldButton);
// 	expect(mockOnChange).toHaveBeenCalled();
// 	const updatedState = mockOnChange.mock.calls[0][0] as EditorState;
// 	expect(updatedState.getCurrentInlineStyle().has('BOLD')).toBe(true);
// });

// it('updates controlled state when toggling ITALIC', () => {
// 	const mockOnChange = jest.fn();
// 	const initialState = EditorState.createEmpty();
// 	render(<WYSIWYGEditor value={initialState} onChange={mockOnChange} />);
// 	const italicButton = screen.getByText('Italic');

// 	fireEvent.click(italicButton);
// 	expect(mockOnChange).toHaveBeenCalled();
// 	const updatedState = mockOnChange.mock.calls[0][0] as EditorState;
// 	expect(updatedState.getCurrentInlineStyle().has('ITALIC')).toBe(true);
// });

// it('updates controlled state when toggling UNDERLINE', () => {
// 	const mockOnChange = jest.fn();
// 	const initialState = EditorState.createEmpty();
// 	render(<WYSIWYGEditor value={initialState} onChange={mockOnChange} />);
// 	const underlineButton = screen.getByText('Underline');

// 	fireEvent.click(underlineButton);
// 	expect(mockOnChange).toHaveBeenCalled();
// 	const updatedState = mockOnChange.mock.calls[0][0] as EditorState;
// 	expect(updatedState.getCurrentInlineStyle().has('UNDERLINE')).toBe(true);
// });
// });

// import WYSIWYGEditor from '@/components/WYSIWYGEditor';
// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';

// describe('WYSIWYGEditor Toolbar', () => {
// 	it('toggles BOLD style when Bold button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const boldButton = screen.getByText('Bold');

// 		// التحقق من الحالة الافتراضية
// 		expect(boldButton).not.toHaveClass('active');

// 		// النقر الأول: تفعيل Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).toHaveClass('active');

// 		// النقر الثاني: إلغاء Bold
// 		fireEvent.click(boldButton);
// 		expect(boldButton).not.toHaveClass('active');
// 	});

// 	it('toggles ITALIC style when Italic button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const italicButton = screen.getByText('Italic');

// 		expect(italicButton).not.toHaveClass('active');

// 		fireEvent.click(italicButton);
// 		expect(italicButton).toHaveClass('active');

// 		fireEvent.click(italicButton);
// 		expect(italicButton).not.toHaveClass('active');
// 	});

// 	it('toggles UNDERLINE style when Underline button is clicked with no selection', () => {
// 		render(<WYSIWYGEditor />);
// 		const underlineButton = screen.getByText('Underline');

// 		expect(underlineButton).not.toHaveClass('active');

// 		fireEvent.click(underlineButton);
// 		expect(underlineButton).toHaveClass('active');

// 		fireEvent.click(underlineButton);
// 		expect(underlineButton).not.toHaveClass('active');
// 	});
// });

import WYSIWYGEditor from '@/components/WYSIWYGEditor';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('WYSIWYGEditor Toolbar', () => {
	it('toggles UNDERLINE style when Underline button is clicked with no selection', () => {
		render(<WYSIWYGEditor />);
		const underlineButton = screen.getByText('Underline');

		// التحقق من الحالة الافتراضية
		expect(underlineButton).not.toHaveClass('active');

		// النقر الأول: تفعيل Underline
		fireEvent.click(underlineButton);
		expect(underlineButton).toHaveClass('active');

		// النقر الثاني: إلغاء Underline
		fireEvent.click(underlineButton);
		expect(underlineButton).not.toHaveClass('active');
	});
});
