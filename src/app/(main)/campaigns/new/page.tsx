'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { createCampaign } from '../_actions/campaign-actions';

const campaignSchema = z.object({
  name: z
    .string()
    .min(3, 'Campaign name must be at least 3 characters')
    .max(100, 'Campaign name must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  fundingGoal: z
    .number()
    .min(1, 'Funding goal must be at least 1')
    .max(1000000, 'Funding goal must be less than 1,000,000'),
  mainPhoto: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      '.jpg, .png, .webp files are accepted.'
    ),
  additionalPhotos: z
    .array(z.instanceof(File))
    .max(5, 'You can upload up to 5 additional photos')
    .refine(
      (files) => files.every((file) => file.size <= 5000000),
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        files.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        ),
      '.jpg, .png, .webp files are accepted.'
    ),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export default function NewCampaignPage() {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: '',
      description: '',
      fundingGoal: 0,
      additionalPhotos: [],
    },
  });

  async function onSubmit(values: CampaignFormValues) {
    if (!user) {
      return;
    }

    setIsSubmitting(true);

    try {
      const campaign = await createCampaign(values);

      // Redirect to the new campaign page
      router.push(`/campaigns/${campaign.id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            You must be logged in to create a campaign.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Create a New Campaign</CardTitle>
        <CardDescription>
          Fill out the form below to start your fundraising campaign for animal
          welfare.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter campaign name' {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a catchy name for your campaign.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Describe your campaign' {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide details about your campaign and its goals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fundingGoal'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funding Goal</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter funding goal'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Set the amount you need to raise for your campaign.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='mainPhoto'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Photo</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='.jpg,.jpeg,.png,.webp'
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a main photo for your campaign (max 5MB).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='additionalPhotos'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Photos</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='.jpg,.jpeg,.png,.webp'
                      multiple
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files || []))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Upload up to 5 additional photos (max 5MB each).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
