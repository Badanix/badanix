/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tomato: '#ff6347',
        primary: '#14361d', 
        primaryLight: '#0f2415',
        secondary: '#856443',  
        'text-tomato': '#e61017',
      
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      
      fontFamily: {
        'host-grotesk': ['"Host Grotesk"', 'sans-serif'],
        'playwrite-gb-s': ['"Playwrite GB S"', 'serif'],
        'Roboto':['"Roboto", sans-serif']
      },
      screens: {
        'custom-xs': '350px',
        'custom-sm': '380px',
        'custom-pixel': '415px',
          'custom-mini' :'768px',
        'custom-14': '430px',

        'custom-md': '900px',  
        'custom-lg': '853px', 
        'custom-xl': '1021px',
        'custom-2xl': '1200px',
        'tablet': '850px',
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)', // Custom shadow
      },
      zIndex: {
        '3': '3', // Adds a z-index of 3
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        
        '.no-arrows': {
          '-moz-appearance': 'textfield', /* Firefox */
        },
        '.no-arrows::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none', /* Chrome, Safari, and Opera */
          'margin': '0',
        },
        '.no-arrows::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none', /* Chrome, Safari, and Opera */
          'margin': '0',
        },
        '.primary-color': {
          'color': '#14361d',
        },
        '.chatbot-bg': {
          'background-color': 'gray',
        },
        '.text-tomato': {
          'color': '#e61017',
        },
        '.primary-bgcolor': {
          'background-color': '#14361d',
        },
        '.secondary-bgcolor': {
          'background-color': '#79b845',
        },
        '.primary-border-color': {
          'border-color': '#14361d',
        },
        'span.nsm7Bb-HzV7m-LgbsSe-BPrWId': {
          'display': 'none!important',
        },
        'body': {
          'background-color': '#ffffff',
          'color': '#000000',
        },
       ' body.dark':{
        'color':'#79b845'
       },
        '.show-on-mobile': {
          'display': 'block',
          '@media (min-width: 600px)': { /* Adjust breakpoint as needed */
            'display': 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', 
          'scrollbar-color': '#14361d  #d1d5db', /* Firefox */
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          'width': '8px', /* Width of the scrollbar */
          'height': '8px', /* Height of the scrollbar */
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          'background': '#f3f4f6', /* Track color */
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          'background': '#d1d5db', /* Scrollbar color */
          'border-radius': '20px', /* Optional: rounded corners */
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        '.tooltip': {
          'position': 'absolute',
          'bottom': '100%', /* Positioned above the icon */
          'left': '50%',
          'transform': 'translateX(-50%)',
          'margin-bottom': '0.5rem',
          'background-color': '#333',
          'color': '#fff',
          'padding': '0.25rem 0.5rem',
          'border-radius': '0.25rem',
          'white-space': 'nowrap',
          'opacity': '0',
          'visibility': 'hidden',
          'transition': 'opacity 0.2s, visibility 0.2s',
        },
        '.group:hover .tooltip': {
          'opacity': '1',
          'visibility': 'visible',
        },
       
'.notification-container': {
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  zIndex: '9999',
},
'.notification': {
  '@apply transition-transform duration-500 ease-out': {},
  whiteSpace: 'nowrap',     // Ensures the text stays on one line
  overflow: 'hidden',       // Hides overflow text
  // textOverflow: 'ellipsis', // Adds '...' when the text overflows
  // maxWidth: '150px',        // Set a smaller max width to trim the text more aggressively
},
'.notification.slide-in': {
  transform: 'translateY(100%)', // Change to vertical direction
  opacity: '0',
  animation: 'slideIn 0.5s forwards',
},
'.notification.slide-out': {
  transform: 'translateY(0)',  
  opacity: '1',
  animation: 'slideOut 0.5s forwards',
},
'@keyframes slideIn': {
  '0%': { transform: 'translateY(100%)', opacity: '0' }, 
  '100%': { transform: 'translateY(0)', opacity: '1' },
},
'@keyframes slideOut': {
  '0%': { transform: 'translateY(0)', opacity: '1' },
  '100%': { transform: 'translateY(100%)', opacity: '0' },  
},
skeleton: {
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
},


      });
      
    },
    daisyui
  ],
};
