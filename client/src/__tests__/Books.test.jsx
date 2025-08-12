import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Books from '../pages/Books';
import { AuthProvider } from '../contexts/AuthContext';
import { booksAPI } from '../services/api';

// --- Mock the books API ---
vi.mock('../services/api', () => ({
    booksAPI: {
        getBooks: vi.fn(),
        createBook: vi.fn(),
    },
}));

// --- Mock AuthContext (default: admin user) ---
vi.mock('../contexts/AuthContext', () => {
    const mockUseAuth = vi.fn(() => ({
        user: { role: 'admin' },
        isAdmin: true,
    }));
    
    return {
        AuthProvider: ({ children }) => <>{children}</>,
        useAuth: mockUseAuth,
    };
});

// --- Helper component to wrap Books with required providers ---
const BooksWithProviders = () => (
    <BrowserRouter>
        <AuthProvider>
            <Books />
        </AuthProvider>
    </BrowserRouter>
);

describe('Books Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders books list', async () => {
        booksAPI.getBooks.mockResolvedValue({
        data: {
            books: [
            {
                _id: '1',
                title: 'Test Book',
                author: 'Test Author',
                genre: 'Fiction',
                availability: { availableCopies: 3, totalCopies: 5 },
            },
            ],
            totalPages: 1,
        },
    });

    render(<BooksWithProviders />);

    await waitFor(() => {
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('by Test Author')).toBeInTheDocument();
    });
});

    it('shows add book button for admin', () => {
    render(<BooksWithProviders />);
    expect(screen.getByText('Add Book')).toBeInTheDocument();
});

    // TODO: Fix this test - need to properly mock useAuth for different user roles
    // it('does not show add book button for non-admin', () => {
    //     // This test needs a different approach to mock useAuth
    // });
});
