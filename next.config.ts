import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    //domains: ['lh3.googleusercontent.com','localhost','localhost:8999','images.pexels.com','res.cloudinary.com'],
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
      },
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com'
      },
      {
        protocol:'https',
        hostname:'images.pexel.com'
      },
      {
        protocol:'http',
        hostname:'localhost',
      },
      {
        protocol:'http',
        hostname:'localhost:8999'
      }
    ]
  },
  /*images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        //pathname:'/assets/billboards'
        //pathname:'/assets/billboards'
      }
    ]
  },*/
  experimental: {
    outputFileTracing: true,
  },
  output:'standalone',
  port: 8999,
};

export default nextConfig;
