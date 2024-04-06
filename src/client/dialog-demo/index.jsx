import React from 'react';
import { createRoot } from 'react-dom/client';
import SheetEditor from './components/SheetEditor';

import './styles.css';

const container = document.getElementById('index');
const root = createRoot(container);
root.render(<SheetEditor />);
