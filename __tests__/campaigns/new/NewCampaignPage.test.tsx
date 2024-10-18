import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import NewCampaignPage from '@/app/(main)/campaigns/new/page';
import { createCampaign } from '@/app/(main)/campaigns/_actions/campaign-actions';

// Mock the dependencies
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/(main)/campaigns/_actions/campaign-actions', () => ({
  createCampaign: jest.fn(),
}));

describe('NewCampaignPage', () => {
  const mockUser = { id: 'user123' };
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders authentication required message when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });
    render(<NewCampaignPage />);
    expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    expect(
      screen.getByText('You must be logged in to create a campaign.')
    ).toBeInTheDocument();
  });

  it('renders the campaign creation form when user is logged in', () => {
    render(<NewCampaignPage />);
    expect(screen.getByText('Create a New Campaign')).toBeInTheDocument();
    expect(screen.getByLabelText('Campaign Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Funding Goal')).toBeInTheDocument();
    expect(screen.getByLabelText('Main Photo')).toBeInTheDocument();
    expect(screen.getByLabelText('Additional Photos')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockCampaign = { id: 'campaign123' };
    (createCampaign as jest.Mock).mockResolvedValue(mockCampaign);

    render(<NewCampaignPage />);

    fireEvent.change(screen.getByLabelText('Campaign Name'), {
      target: { value: 'Test Campaign' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'This is a test campaign description' },
    });
    fireEvent.change(screen.getByLabelText('Funding Goal'), {
      target: { value: '1000' },
    });

    const mainPhotoInput = screen.getByLabelText('Main Photo');
    const additionalPhotosInput = screen.getByLabelText('Additional Photos');

    Object.defineProperty(mainPhotoInput, 'files', {
      value: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
    });
    fireEvent.change(mainPhotoInput);

    Object.defineProperty(additionalPhotosInput, 'files', {
      value: [new File([''], 'additional.jpg', { type: 'image/jpeg' })],
    });
    fireEvent.change(additionalPhotosInput);

    fireEvent.click(screen.getByText('Create Campaign'));

    await waitFor(() => {
      expect(createCampaign).toHaveBeenCalledWith(expect.any(Object));
      expect(mockRouter.push).toHaveBeenCalledWith('/campaigns/campaign123');
    });
  });

  it('displays validation errors for invalid input', async () => {
    render(<NewCampaignPage />);

    fireEvent.click(screen.getByText('Create Campaign'));

    await waitFor(() => {
      expect(
        screen.getByText('Campaign name must be at least 3 characters')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Description must be at least 10 characters')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Funding goal must be at least 1')
      ).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    (createCampaign as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<NewCampaignPage />);

    fireEvent.change(screen.getByLabelText('Campaign Name'), {
      target: { value: 'Test Campaign' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'This is a test campaign description' },
    });
    fireEvent.change(screen.getByLabelText('Funding Goal'), {
      target: { value: '1000' },
    });

    const mainPhotoInput = screen.getByLabelText('Main Photo');
    Object.defineProperty(mainPhotoInput, 'files', {
      value: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
    });
    fireEvent.change(mainPhotoInput);

    fireEvent.click(screen.getByText('Create Campaign'));

    await waitFor(() => {
      expect(screen.getByText('Creating Campaign...')).toBeInTheDocument();
      expect(screen.getByText('Creating Campaign...')).toBeDisabled();
    });
  });
});
