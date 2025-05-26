/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    staleTimes: {
      dynamic: 600,
    },
  },
};

export default config;
