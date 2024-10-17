import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Users, DollarSign, Leaf, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Dog from '@/public/dog.jpg';

export default function LandingPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1 pt-16 md:pt-0'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary relative overflow-hidden'>
          <div className="absolute inset-0 bg-[url('/paw-pattern.png')] opacity-10"></div>
          <div className=' px-4 md:px-6 relative z-10'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center'>
              <div className='flex flex-col justify-center space-y-4 text-white'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Empowering Compassion for Animals
                  </h1>
                  <p className='max-w-[600px] text-gray-200 md:text-xl'>
                    Join our global community of animal lovers. Create or
                    support campaigns for animal welfare, veterinary care,
                    shelters, and wildlife conservation.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link
                    className='inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50'
                    href='#'
                  >
                    Start a Campaign
                  </Link>
                  <Link
                    className='inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white/10 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 text-white'
                    href='#'
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
              <div className='relative'>
                <Image
                  alt='Hero'
                  className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
                  height='550'
                  src={Dog}
                  width='550'
                />
                <div className='absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg'>
                  <p className='text-primary font-bold'>1,000+</p>
                  <p className='text-sm text-gray-600'>Animals Helped</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className=' px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              How It Works
            </h2>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
              {[
                {
                  icon: Heart,
                  title: 'Create a Campaign',
                  description:
                    'Start a fundraising campaign for any animal welfare cause close to your heart.',
                },
                {
                  icon: Users,
                  title: 'Share Your Story',
                  description:
                    'Spread the word about your campaign and reach compassionate donors worldwide.',
                },
                {
                  icon: DollarSign,
                  title: 'Receive Funds',
                  description:
                    'Collect donations securely and use them to make a positive impact on animal lives.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-y-4 text-center group hover:bg-primary hover:text-white rounded-lg p-6 transition-all duration-300'
                >
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300'>
                    <item.icon className='h-10 w-10' />
                  </div>
                  <h3 className='text-xl font-bold'>{item.title}</h3>
                  <p className='text-gray-500 dark:text-gray-400 group-hover:text-white/90'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100'>
          <div className=' px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              Featured Campaigns
            </h2>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  title: 'Save the Rainforest Sloths',
                  description: 'Help protect sloths and their habitats',
                  progress: 67,
                  image: '/sloth.jpg',
                },
                {
                  title: 'Ocean Cleanup Initiative',
                  description:
                    'Join us in cleaning up our oceans for marine life',
                  progress: 42,
                  image: '/ocean.jpg',
                },
                {
                  title: 'Wildlife Rescue Center',
                  description: 'Support our local wildlife rescue efforts',
                  progress: 89,
                  image: '/wildlife.jpg',
                },
              ].map((campaign, index) => (
                <div
                  key={index}
                  className='rounded-lg border bg-white text-gray-900 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105'
                >
                  <Image
                    alt={campaign.title}
                    className='w-full h-48 object-cover'
                    height='200'
                    src={campaign.image}
                    width='400'
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-bold'>{campaign.title}</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      {campaign.description}
                    </p>
                    <div className='mt-4 flex items-center'>
                      <div className='h-2 flex-1 bg-gray-200 rounded-full'>
                        <div
                          className='h-2 bg-primary rounded-full'
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                      <span className='ml-4 text-sm font-medium'>
                        {campaign.progress}%
                      </span>
                    </div>
                    <Button className='mt-4 w-full bg-primary text-white hover:bg-primary/90'>
                      Donate Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className=' px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              What People Say
            </h2>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
              {[
                {
                  name: 'Emma Thompson',
                  role: 'Wildlife Photographer',
                  quote:
                    "Animalfund has revolutionized how we support animal causes. It's user-friendly and incredibly effective!",
                },
                {
                  name: 'Dr. James Chen',
                  role: 'Veterinarian',
                  quote:
                    "As a vet, I've seen firsthand how Animalfund campaigns have saved countless animal lives. It's a game-changer.",
                },
                {
                  name: 'Sophia Rodriguez',
                  role: 'Environmental Activist',
                  quote:
                    "The platform's reach is phenomenal. We raised funds for our marine conservation project in record time!",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center space-y-4 text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
                >
                  <Image
                    alt={testimonial.name}
                    className='rounded-full border-4 border-primary'
                    height='100'
                    src={Dog}
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover',
                    }}
                    width='100'
                  />
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold'>{testimonial.name}</h3>
                    <p className='text-sm text-primary font-medium'>
                      {testimonial.role}
                    </p>
                    <p className='text-gray-500 dark:text-gray-400 italic'>
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-primary text-white relative overflow-hidden'>
          <div className="absolute inset-0 bg-[url('/world-map.png')] opacity-10"></div>
          <div className=' px-4 md:px-6 relative z-10'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Ready to Make a Global Impact?
                </h2>
                <p className='mx-auto max-w-[600px] text-gray-200 md:text-xl'>
                  Join Animalfund today and be part of a worldwide movement
                  creating positive change for animals in need.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-white text-gray-900'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <Button
                    className='bg-white text-primary hover:bg-gray-100'
                    type='submit'
                  >
                    Join Us
                  </Button>
                </form>
                <p className='text-xs text-gray-200'>
                  By signing up, you agree to our{' '}
                  <Link
                    className='underline underline-offset-2 hover:text-gray-100'
                    href='#'
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-green-50'>
          <div className=' px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
              <div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl mb-4'>
                  Our Global Impact
                </h2>
                <p className='text-gray-500 dark:text-gray-400 mb-6'>
                  Animalfund has made a significant difference worldwide. Here's
                  a glimpse of our collective achievements:
                </p>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      icon: Leaf,
                      title: '1M+ Trees Planted',
                      description: 'Supporting wildlife habitats',
                    },
                    {
                      icon: Globe,
                      title: '100+ Countries',
                      description: 'Global reach and impact',
                    },
                    {
                      icon: Users,
                      title: '500K+ Donors',
                      description: 'Growing community of supporters',
                    },
                    {
                      icon: DollarSign,
                      title: '$10M+ Raised',
                      description: 'Funds for animal welfare',
                    },
                  ].map((stat, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white'>
                        <stat.icon className='h-6 w-6' />
                      </div>
                      <div>
                        <h3 className='font-bold'>{stat.title}</h3>
                        <p className='text-sm text-gray-500'>
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='relative'>
                <Image
                  alt='Global Impact'
                  className='rounded-lg object-cover'
                  height='400'
                  src={Dog}
                  width='600'
                />
                <div className='absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg'>
                  <p className='text-primary font-bold'>Join Us Today</p>
                  <p className='text-sm text-gray-600'>Be part of the change</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='bg-gray-900 text-white py-12'>
        <div className=' px-4 md:px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>About Us</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='hover:underline'>
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Team
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Get Involved</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='hover:underline'>
                    Start a Campaign
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Resources</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='hover:underline'>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Connect</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='hover:underline'>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center'>
            <p className='text-sm text-gray-400'>
              © 2024 Animalfund. All rights reserved.
            </p>
            <nav className='flex gap-4 sm:gap-6 mt-4 sm:mt-0'>
              <Link
                className='text-sm text-gray-400 hover:underline underline-offset-4'
                href='#'
              >
                Terms of Service
              </Link>
              <Link
                className='text-sm text-gray-400 hover:underline underline-offset-4'
                href='#'
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
