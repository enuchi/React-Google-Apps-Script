import React from 'react';
import { createRoot } from 'react-dom/client';
import SheetEditor from './components/SheetEditor';
import { ThemeContext, themes } from './themes';

import './styles.css';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(
  <ThemeContext.Provider value={themes.dark}>
    <SheetEditor />
  </ThemeContext.Provider>
);
