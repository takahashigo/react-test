import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import RenderInput from './components/renderInput/RenderInput';
import FrameworkList from './components/frameworkList/FrameworkList';
import MockServer from './components/mockServer/MockServer';
import Redux from './components/redux/Redux';
import ReduxAsync from './components/reduxAsync/ReduxAsync';
import CustomHooks from './components/CustomHooks';

export const output = (text: string) => {
  console.log(text);
};
const data = [
  {
    id: 1,
    item: 'React',
  },
  {
    id: 2,
    item: 'Angular',
  },
  {
    id: 3,
    item: 'Vue',
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <RenderInput outputConsole={output} />
        <FrameworkList data={data} />
        <MockServer />
        <Redux />
        <ReduxAsync />
        <CustomHooks />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
