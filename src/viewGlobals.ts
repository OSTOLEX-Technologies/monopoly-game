import {BoardPresenter, PieceColor} from "./board";
import {AnimationRenderersManager, PieceMoveAnimationRenderer} from "./animationsRenderers";

export const boardView = new BoardPresenter();

const piece = boardView.addPiece(0, PieceColor.Blue);
boardView.addPiece(1, PieceColor.Green);
boardView.addPiece(2, PieceColor.Pink);

export const animationRenderersManager = new AnimationRenderersManager();

animationRenderersManager.add(new PieceMoveAnimationRenderer(
    piece,
    boardView.getCell(0),
    boardView.getCell(10),
    3000, () => {
        console.log("done");
    }));
