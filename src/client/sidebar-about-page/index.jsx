import React from 'react';
import { createRoot } from 'react-dom/client';
import About from './components/About';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<About />);
