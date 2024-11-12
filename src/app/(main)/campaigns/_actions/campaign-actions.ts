'use server';

import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

type CampaignValues = {
  name: string;
  description: string;
  fundingGoal: number;
  mainPhoto?: File;
  additionalPhotos?: File[];
};

export async function createCampaign(values: CampaignValues) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const name = values.name;
  const description = values.description;
  const fundingGoal = values.fundingGoal;
  //   const mainPhoto = values.mainPhoto') as File;
  //   const additionalPhotos = formData.getAll('additionalPhotos') as File[];

  // TODO: Implement file upload logic here
  // For now, we'll just use placeholder URLs
  //   const mainPhotoUrl = '/placeholder.jpg';
  //   const additionalPhotoUrls = Array(additionalPhotos.length).fill(
  //     '/placeholder.jpg'
  //   );

  try {
    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        fundingGoal,
        mainPhotoUrl: '/placeholder.jpg', // Placeholder URL for main photo
        // additionalPhotoUrls,
        userId,
      },
    });
    console.log('test');

    revalidatePath('/campaigns');
    return campaign;
  } catch (error) {
    console.error('Failed to create campaign:', error);
    throw new Error('Failed to create campaign');
  }
}
