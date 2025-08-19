/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Mobile responsive classes
    'md:hidden',
    'hidden',
    'md:block',
    'md:flex',
    'md:w-64',
    'md:px-6',
    'md:py-4',
    'md:text-2xl',
    'md:text-lg',
    'md:space-x-3',
    'md:space-x-2',
    'sm:hidden',
    'sm:block',
    'sm:text-base',
    'sm:text-lg',
    'sm:px-4',
    'sm:py-2',
    'sm:w-8',
    'sm:h-8',
    'sm:w-12',
    'sm:h-12',
    'sm:space-x-2',
    'sm:space-x-3',
    'sm:inline',
    'lg:hidden',
    // Responsive grid and layout
    'md:grid-cols-5',
    'md:text-4xl',
    'md:text-5xl',
    // Mobile menu classes
    'fixed',
    'inset-0',
    'z-40',
    'z-50',
    'bg-black/50',
    'backdrop-blur-sm',
    'transform',
    'transition-transform',
    'duration-300',
    'ease-in-out',
    // Flex responsive
    'md:flex-col',
    'flex-1',
    'w-full',
    'transition-all'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

