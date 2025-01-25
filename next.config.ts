import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "6mb",
		},
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		]
	},
}

export default nextConfig
