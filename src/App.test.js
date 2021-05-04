import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title correctly', () => {
	render(<App />);
	const titleElement = screen.getByText(/Technical Test/i);
	expect(titleElement).toBeInTheDocument();
});
