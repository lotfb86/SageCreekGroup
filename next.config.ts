import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:\\Users\\Tim Van Valin\\SageCreekGroup\\.claude\\worktrees\\jolly-jemison",
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/home-1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/new-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/tim-van-valin",
        destination: "/about/tim-van-valin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
