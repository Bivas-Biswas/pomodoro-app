import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SettingContexProvider from './Context/SettingContex';

ReactDOM.render(
  <SettingContexProvider>
    <App />
    </SettingContexProvider>,
  document.getElementById('root')
);

//import Test from "./test";
// ReactDOM.render(
//     <React.StrictMode>
//         {/* <App2 /> */}
//         <Test/>
//     </React.StrictMode>,
//     document.getElementById('root')
// );