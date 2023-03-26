import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {boardView} from "./viewGlobals";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


const piecesLoadedEvent = new Event('piecesLoaded');

async function dispatchPiecesLoadedEvent() {
    while(!boardView.cells.every((cell) => cell.getPieces().every((piece) => piece.object3D))) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    window.dispatchEvent(piecesLoadedEvent);
}

dispatchPiecesLoadedEvent();
