/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'a.ltrbxd.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'dynamic-media-cdn.tripadvisor.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'www.travelmate.com.bd',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'www.shutterstock.com',
          pathname: '**',
        },
      
      ],
    },
  };
  
  export default nextConfig;
 