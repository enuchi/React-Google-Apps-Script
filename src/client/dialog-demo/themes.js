import React from 'react';

export const themes = {
  light: {
    foreground: 'pink',
    background: 'purple',
  },
  dark: {
    foreground: 'red',
    background: 'green',
  },
};

export const ThemeContext = React.createContext(themes.light);
