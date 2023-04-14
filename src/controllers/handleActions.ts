import {Action} from "../game/Actions/Action";
import {MoveAction} from "../game/Actions/MoveAction";
import {GoAction} from "../game/Actions/GoAction";
import {GoToJailAction} from "../game/Actions/GoToJailAction";
import {GetOutOfJailAction} from "../game/Actions/GetOutOfJailAction";
import {ChanceAction} from "../game/Actions/ChanceAction";
import {CommunityAction} from "../game/Actions/CommunityAction";
import {GetFreeCardAction} from "../game/Actions/GetFreeCardAction";
import {PayAction} from "../game/Actions/PayAction";
import {boardView} from "../viewGlobals";
import {PiecePresenter} from "../board";

export async function handleActions(actions: Array<Action>, piece: PiecePresenter) {
    for (const action of actions) {
        await handleAction(action, piece);
    }
}

async function handleAction(action: Action, piece: PiecePresenter) {
    if (action instanceof MoveAction) await handleMoveAction(action, piece);
    else if (action instanceof GoAction) handleGoAction(action);
    else if (action instanceof GoToJailAction) handleGoToJailAction(action);
    else if (action instanceof GetOutOfJailAction) handleGetOutOfJailAction(action);
    else if (action instanceof ChanceAction) handleChanceAction(action);
    else if (action instanceof CommunityAction) handleCommunityAction(action);
    else if (action instanceof GetFreeCardAction) handleGetFreeCardAction(action);
    else if (action instanceof PayAction) handlePayAction(action);
}

async function handleMoveAction(action: MoveAction, piece: PiecePresenter) {
    if (action.dice.length != 0) {

    } else {
        const newPosition = boardView.getCell(action.position);
        await boardView.movePiece(piece, newPosition);
    }
}

function handleGoAction(action: GoAction) {}

function handleGoToJailAction(action: GoToJailAction) {}

function handleGetOutOfJailAction(action: GetOutOfJailAction) {}

function handleChanceAction(action: ChanceAction) {}

function handleCommunityAction(action: CommunityAction) {}

function handleGetFreeCardAction(action: GetFreeCardAction) {}

function handlePayAction(action: PayAction) { }
