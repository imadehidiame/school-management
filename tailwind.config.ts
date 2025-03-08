import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /**
   Light Blues:

Alice Blue: #F0F8FF (RGB: 240, 248, 255) (HSL: 208°, 100%, 97%)
Light Cyan: #E0FFFF (RGB: 224, 255, 255) (HSL: 180°, 100%, 94%)
Light Blue: #ADD8E6 (RGB: 173, 216, 230) (HSL: 206°, 47%, 79%)
Powder Blue: #B0E0E6 (RGB: 176, 224, 230) (HSL: 187°, 52%, 79%)
Light Steel Blue: #B0C4DE (RGB: 176, 196, 222) (HSL: 214°, 38%, 78%)
Pale Turquoise: #AFEEEE (RGB: 175, 238, 238) (HSL: 180°, 51%, 81%)
Sky Blue: #87CEEB (RGB: 135, 206, 235) (HSL: 203°, 74%, 73%)
Medium Blues:

Turquoise: #40E0D0 (RGB: 64, 224, 208) (HSL: 174°, 71%, 56%)
Aquamarine: #7FFFD4 (RGB: 127, 255, 212) (HSL: 160°, 100%, 75%)
Deep Sky Blue: #00BFFF (RGB: 0, 191, 255) (HSL: 195°, 100%, 50%)
Dodger Blue: #1E90FF (RGB: 30, 144, 255) (HSL: 210°, 86%, 56%)
Royal Blue: #4169E1 (RGB: 65, 105, 225) (HSL: 225°, 62%, 57%)
Steel Blue: #4682B4 (RGB: 70, 130, 180) (HSL: 207°, 51%, 49%)
Medium Turquoise: #48D1CC (RGB: 72, 209, 204) (HSL: 178°, 65%, 55%)
Dark Blues:

Navy: #000080 (RGB: 0, 0, 128) (HSL: 240°, 100%, 25%)
Dark Blue: #00008B (RGB: 0, 0, 139) (HSL: 240°, 100%, 27%)
Midnight Blue: #191970 (RGB: 25, 25, 112) (HSL: 240°, 64%, 27%)
Indigo: #4B0082 (RGB: 75, 0, 130) (HSL: 275°, 100%, 25%)
Slate Blue: #6A5ACD (RGB: 106, 90, 205) (HSL: 247°, 56%, 58%)
Other Blues:

Blue: #0000FF (RGB: 0, 0, 255) (HSL: 240°, 100%, 50%)
Cobalt Blue: #0047AB (RGB: 0, 71, 171) (HSL: 210°, 100%, 34%)
Denim Blue: #1560BD (RGB: 21, 96, 189) (HSL: 213°, 80%, 41%)
Electric Blue: #7DF9FF (RGB: 125, 249, 255) (HSL: 184°, 98%, 75%)
Carolina Blue: #99CBFF
   */
  theme: {
	screens: {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
  	},
  	extend: {
  		colors: {
			'pagination-blue':'#B0C4DE',
			'deep-sky-blue':'#00BFFF',
			'royal-blue':'#4169E1',
			'light-cyan':'#E0FFFF',
			snow: '#FFFAFA',
			oldlace: '#FDF5E6',
			gainsboro: '#DCDCDC',
			floralWhite: '#FFFAF0',
			ivory: '#FFFFF0',
			seashell: '#FFF5EE',
			ghostWhite: '#F8F8FF',
			app_blue_default: '#1E90FF',
			app_blue_light: '#ADD8E6',
			app_white: {
				white: '#FFFFFF',
				snow: '#FFFAFA', 
				ivory: '#FFFFF0',
				floralWhite: '#FFFAF0',
				seashell: '#FFF5EE',
				oldLace: '#FDF5E6',
				whiteSmoke: '#F5F5F5',
				gainsboro: '#DCDCDC',
				ghostWhite: '#F8F8FF',
				antiqueWhite: '#FAEBD7',
			},
			app_blue:{
				light: '#ADD8E6',
          		DEFAULT: '#1E90FF',
          		dark: '#000080',
			},
			app_card_sky:'#C3EBFA',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
