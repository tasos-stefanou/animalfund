import type { Metadata } from 'next';
import './globals.css';

// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'AnimalFund',
  description: 'A crowdfunding platform for animal welfare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
