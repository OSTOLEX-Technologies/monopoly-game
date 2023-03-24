import {BoardView, PieceColor} from "./boardUtils";

export const boardView = new BoardView();

boardView.addPiece(0, PieceColor.Blue);
boardView.addPiece(1, PieceColor.Green);
boardView.addPiece(2, PieceColor.Pink);

