import WYSIWYGEditor from '@/components/WYSIWYGEditor';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditorState, RichUtils } from 'draft-js';

describe('WYSIWYGEditor', () => {
	let editorState: EditorState;

	let onChangeMock: jest.Mock;

	beforeEach(() => {
		editorState = EditorState.createEmpty();
		onChangeMock = jest.fn();
	});

	it('should render the editor and toolbar correctly', () => {
		render(<WYSIWYGEditor value={editorState} onChange={jest.fn()} />);

		expect(screen.getByText('Bold')).toBeInTheDocument();
		expect(screen.getByText('Italic')).toBeInTheDocument();
		expect(screen.getByText('Underline')).toBeInTheDocument();
	});

	//Bold
	it('should toggle bold style on click', () => {
		const initialEditorState = EditorState.createEmpty();

		const { rerender } = render(<WYSIWYGEditor value={initialEditorState} onChange={onChangeMock} />);

		const boldButton = screen.getByText('Bold');

		expect(boldButton).not.toHaveClass('active');

		fireEvent.click(boldButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);

		const newEditorState = onChangeMock.mock.calls[0][0];
		expect(newEditorState.getCurrentInlineStyle().has('BOLD')).toBe(true);

		rerender(<WYSIWYGEditor value={newEditorState} onChange={onChangeMock} />);

		expect(screen.getByText('Bold')).toHaveClass('active');
	});

	it('should remove bold style when clicked again', () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
		render(<WYSIWYGEditor value={newState} onChange={onChangeMock} />);

		const boldButton = screen.getByText('Bold');
		fireEvent.click(boldButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);

		const toggledState = onChangeMock.mock.calls[0][0];
		expect(toggledState.getCurrentInlineStyle().has('BOLD')).toBe(false);
	});

	// Italic
	it('should toggle italic style on click', () => {
		const initialEditorState = EditorState.createEmpty();
		const { rerender } = render(<WYSIWYGEditor value={initialEditorState} onChange={onChangeMock} />);

		const italicButton = screen.getByText('Italic');

		expect(italicButton).not.toHaveClass('active');

		fireEvent.click(italicButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		const newEditorState = onChangeMock.mock.calls[0][0];
		expect(newEditorState.getCurrentInlineStyle().has('ITALIC')).toBe(true);

		rerender(<WYSIWYGEditor value={newEditorState} onChange={onChangeMock} />);

		expect(screen.getByText('Italic')).toHaveClass('active');
	});

	it('should remove italic style when clicked again', () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
		render(<WYSIWYGEditor value={newState} onChange={onChangeMock} />);

		const italicButton = screen.getByText('Italic');

		fireEvent.click(italicButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		const toggledState = onChangeMock.mock.calls[0][0];
		expect(toggledState.getCurrentInlineStyle().has('ITALIC')).toBe(false);
	});

	// Underline
	it('should toggle underline style on click', () => {
		const initialEditorState = EditorState.createEmpty();
		const { rerender } = render(<WYSIWYGEditor value={initialEditorState} onChange={onChangeMock} />);

		const underlineButton = screen.getByText('Underline');

		expect(underlineButton).not.toHaveClass('active');

		fireEvent.click(underlineButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		const newEditorState = onChangeMock.mock.calls[0][0];
		expect(newEditorState.getCurrentInlineStyle().has('UNDERLINE')).toBe(true);

		rerender(<WYSIWYGEditor value={newEditorState} onChange={onChangeMock} />);

		expect(screen.getByText('Underline')).toHaveClass('active');
	});

	it('should remove underline style when clicked again', () => {
		const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
		render(<WYSIWYGEditor value={newState} onChange={onChangeMock} />);

		const underlineButton = screen.getByText('Underline');

		fireEvent.click(underlineButton);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		const toggledState = onChangeMock.mock.calls[0][0];
		expect(toggledState.getCurrentInlineStyle().has('UNDERLINE')).toBe(false);
	});

	it('should apply inline style to selected text', () => {
		const { container } = render(<WYSIWYGEditor value={editorState} onChange={jest.fn()} />);
		const boldButton = screen.getByText('Bold');

		const textElement = container.querySelector('.public-DraftEditor-content') as HTMLElement;
		fireEvent.mouseUp(textElement);

		fireEvent.click(boldButton);

		expect(screen.getByText('Bold')).toHaveClass('active');
	});

	it('should handle editor state change correctly', () => {
		const mockOnChange = jest.fn();
		render(<WYSIWYGEditor value={editorState} onChange={mockOnChange} />);

		const boldButton = screen.getByText('Bold');

		fireEvent.click(boldButton);

		expect(mockOnChange).toHaveBeenCalled();
	});
});
