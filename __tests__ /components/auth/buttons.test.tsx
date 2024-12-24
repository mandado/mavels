import { render, screen, fireEvent } from '@testing-library/react';
import LoginButtons from '@/components/auth/buttons';
import { useAuth } from '@/hooks/use-auth';

jest.mock('@/hooks/use-auth');

const mockUseAuth = useAuth as jest.Mock;

describe('LoginButtons', () => {
  const mockLoginWithGoogle = jest.fn();
  
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      loginWithGoogle: mockLoginWithGoogle,
      loginWithGithub: jest.fn(),
      logout: jest.fn(),
      error: null,
      loading: false,
      user: null
    });
  });

  it('calls loginWithGoogle when Google button is clicked', () => {
    render(<LoginButtons />);
    
    const googleButton = screen.getByText(/Entrar com Google/i);
    fireEvent.click(googleButton);
    
    expect(mockLoginWithGoogle).toHaveBeenCalled();
  });
});