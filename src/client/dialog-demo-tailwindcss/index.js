import React from 'react';
import ReactDOM from 'react-dom';
import { Flowbite } from 'flowbite-react';
import SheetEditor from './components/SheetEditor';
import './styles.css';

const App = () => {
  return (
    <Flowbite>
      <SheetEditor />
    </Flowbite>
  );
};

ReactDOM.render(<App />, document.getElementById('index'));
