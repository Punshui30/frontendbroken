/** @type {import('tailwindcss').Config} */
const withOpacityValue = (variable) => {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `hsl(var(${variable}))`
      : `hsl(var(${variable}) / ${opacityValue})`;
};

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: withOpacityValue('--background'),
        'background-secondary': withOpacityValue('--background-secondary'),

        foreground: withOpacityValue('--foreground'),
        muted: withOpacityValue('--muted'),
        'muted-foreground': withOpacityValue('--muted-foreground'),

        accent: withOpacityValue('--accent'),
        'accent-foreground': withOpacityValue('--accent-foreground'),

        popover: withOpacityValue('--popover'),
        'popover-foreground': withOpacityValue('--popover-foreground'),

        border: withOpacityValue('--border'),
        input: withOpacityValue('--input'),

        card: withOpacityValue('--card'),
        'card-foreground': withOpacityValue('--card-foreground'),

        primary: withOpacityValue('--primary'),
        'primary-foreground': withOpacityValue('--primary-foreground'),

        secondary: withOpacityValue('--secondary'),
        'secondary-foreground': withOpacityValue('--secondary-foreground'),

        destructive: withOpacityValue('--destructive'),
        'destructive-foreground': withOpacityValue('--destructive-foreground'),

        ring: withOpacityValue('--ring'),
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            filter: 'drop-shadow(0 0 2px hsl(var(--primary))) drop-shadow(0 0 4px hsl(var(--primary)))',
          },
          '100%': {
            filter: 'drop-shadow(0 0 6px hsl(var(--primary))) drop-shadow(0 0 12px hsl(var(--primary)))',
          },
        },
      },
    },
  },
  plugins: [],
};

