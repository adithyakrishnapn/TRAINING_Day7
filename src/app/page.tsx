import { Metadata } from 'next';
import { HOME_PAGE_C0NTENTS } from '@/constants/text.constants';

export const metadata: Metadata = {
  title: 'Webpage To Display Posts',
  description: 'This webpage fetches and displays posts from an external API.',
  keywords: ['posts', 'API', 'fetch', 'Next.js', 'React'],
  alternates: {
    canonical: 'https://www.google.com',
  },
  openGraph: {
    title: 'Webpage To Display Posts',
    description: 'This webpage fetches and displays posts from an external API.',
    url: 'https://www.google.com',
    siteName: 'Posts Display',
    images: [
      {
        url:'https://www.whizlabs.com/_next/static/media/Logo_white.d28d6818.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
}

async function Home(){
  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
    cache: 'no-store'
  });

  const jsonLd = {
    '@context' : 'https://schema.org',
    '@type' : 'Webpage',
    name: 'Webpage To Display Posts',
    description: 'This webpage fetches and displays posts from an external API.',
    url: 'https://www.google.com',
  }

  const posts = await response.json();
  const updatedAt = new Date().toISOString();
  return (
    <main className="homepage">
      <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}  />
      <header className="homepage-header">
        <p className="homepage-eyebrow">{HOME_PAGE_C0NTENTS.EYEBROW}</p>
        <h1>{HOME_PAGE_C0NTENTS.HEADING}</h1>
        <p className="homepage-intro">{HOME_PAGE_C0NTENTS.INTRO}</p>
        <p className="homepage-subheading">{HOME_PAGE_C0NTENTS.SUBHEADING}</p>
      </header>

      <section className="posts-section" aria-labelledby="latest-posts">
        <div className="section-heading">
          <h2 id="latest-posts">{HOME_PAGE_C0NTENTS.LATEST_POSTS}</h2>
          <span>{HOME_PAGE_C0NTENTS.PAGE_SIZE}</span>
        </div>
        <ul>
          {posts.slice(0,5).map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>

      <p className="homepage-updated">
        <span>{HOME_PAGE_C0NTENTS.UPDATED}</span>
        <time dateTime={updatedAt}>{updatedAt}</time>
      </p>
    </main>
  )
}

export default Home;