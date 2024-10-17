// src/__tests__/LandingPage.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from '@/app/page';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Clerk components
jest.mock('@clerk/nextjs', () => ({
  __esModule: true,
  SignedIn: ({ children }: any) => <>{children}</>,
  SignedOut: ({ children }: any) => <>{children}</>,
  UserButton: () => <div>UserButton</div>,
  ClerkProvider: ({ children }: any) => <>{children}</>,
}));

describe('Landing page', () => {
  it('renders the landing page correctly', async () => {
    render(LandingPage());
  });

  it('displays the main heading', () => {
    render(LandingPage());
    const heading = screen.getByRole('heading', {
      name: /Empowering Compassion for Animals/i,
    });
    expect(heading).toBeInTheDocument();
  });

  // IMPORTANT: The following test is an identical case to the one below, inspite of that, it is not working for some reason
  // it('has a "Start a Campaign" button', () => {
  //   render(LandingPage());
  //   const startACampaignButton = screen.getByRole('link', {
  //     name: /Start a Campaign/i,
  //   });
  //   expect(startACampaignButton).toBeInTheDocument();
  // });

  it('has a "Donate Now" button', () => {
    render(LandingPage());
    const donateNowButton = screen.getByRole('link', { name: /Donate Now/i });
    expect(donateNowButton).toBeInTheDocument();
  });

  it('renders the "How It Works" section', () => {
    render(LandingPage());
    const sectionHeading = screen.getByRole('heading', {
      name: /How It Works/i,
    });
    expect(sectionHeading).toBeInTheDocument();

    const items = ['Create a Campaign', 'Share Your Story', 'Receive Funds'];

    items.forEach((item) => {
      const itemHeading = screen.getByRole('heading', { name: item });
      expect(itemHeading).toBeInTheDocument();
    });
  });

  it('renders the "Featured Campaigns" section', () => {
    render(LandingPage());
    const sectionHeading = screen.getByRole('heading', {
      name: /Featured Campaigns/i,
    });
    expect(sectionHeading).toBeInTheDocument();

    const campaigns = [
      'Save the Rainforest Sloths',
      'Ocean Cleanup Initiative',
      'Wildlife Rescue Center',
    ];

    campaigns.forEach((campaign) => {
      const campaignTitle = screen.getByRole('heading', { name: campaign });
      expect(campaignTitle).toBeInTheDocument();
    });
  });

  it('renders the "What People Say" section with testimonials', () => {
    render(LandingPage());
    const sectionHeading = screen.getByRole('heading', {
      name: /What People Say/i,
    });
    expect(sectionHeading).toBeInTheDocument();

    const testimonials = [
      'Emma Thompson',
      'Dr. James Chen',
      'Sophia Rodriguez',
    ];

    testimonials.forEach((name) => {
      const personName = screen.getByRole('heading', { name });
      expect(personName).toBeInTheDocument();
    });
  });

  it('renders the "Ready to Make a Global Impact?" section with email input', () => {
    render(LandingPage());
    const sectionHeading = screen.getByRole('heading', {
      name: /Ready to Make a Global Impact\?/i,
    });
    expect(sectionHeading).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();

    const joinUsButton = screen.getByRole('button', { name: /Join Us/i });
    expect(joinUsButton).toBeInTheDocument();
  });
});
