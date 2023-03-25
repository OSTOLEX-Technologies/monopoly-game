import {BoardPresenter, PieceColor} from "./board";
import {AnimationRenderersManager, PieceMoveAnimationRenderer} from "./animationsRenderers";
import React from "react";

export const boardView = new BoardPresenter();

const piece = boardView.addPiece(0, PieceColor.Blue);
// boardView.addPiece(1, PieceColor.Green);
// boardView.addPiece(2, PieceColor.Yellow);
// boardView.addPiece(1, PieceColor.Green);
// boardView.addPiece(2, PieceColor.Pink);
// boardView.addPiece(3, PieceColor.Purple);
// boardView.addPiece(4, PieceColor.White);
// boardView.addPiece(5, PieceColor.Yellow);
// boardView.addPiece(6, PieceColor.Navyblue);
// boardView.addPiece(7, PieceColor.Orange);


export const animationRenderersManager = new AnimationRenderersManager();

boardView.movePiece(piece, boardView.getCell(4)).then(() => {
    setTimeout(async () => {
        await boardView.movePiece(piece, boardView.getCell(10));
        boardView.removePiece(piece);
    }, 1000);
});
