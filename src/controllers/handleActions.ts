import {Action} from "../game/Actions/Action";
import {MoveAction} from "../game/Actions/MoveAction";
import {GoToJailAction} from "../game/Actions/GoToJailAction";
import {GetOutOfJailAction} from "../game/Actions/GetOutOfJailAction";
import {ChanceAction} from "../game/Actions/ChanceAction";
import {CommunityAction} from "../game/Actions/CommunityAction";
import {boardView, reactChanceCardsManager, reactTreasuryCardsManager, gameHistoryManager, reactModalPopupManager} from "../viewGlobals";
import {PiecePresenter} from "../board";
import {PayRentAction} from "../game/Actions/PayRentAction";

export async function handleActions(actions: Array<Action>, piece: PiecePresenter, playerId: string) {
    for (const action of actions) {
        await handleAction(action, piece, playerId);
    }
}

async function handleAction(action: Action, piece: PiecePresenter, playerId: string) {
    if (action instanceof MoveAction) await handleMoveAction(action, piece);
    else if (action instanceof GoToJailAction) await handleGoToJailAction(action, piece);
    else if (action instanceof GetOutOfJailAction) await handleGetOutOfJailAction(action, piece);
    else if (action instanceof ChanceAction) handleChanceAction(action);
    else if (action instanceof CommunityAction) handleCommunityAction(action);
    else if (action instanceof PayRentAction) handlePayRentAction(action, playerId);

    gameHistoryManager.addHistoryMessage(action.getHistoryMessage(playerId));
}

async function handleMoveAction(action: MoveAction, piece: PiecePresenter) {
    const newPosition = action.getNewPosition();
    const newCellPosition = boardView.getCell(newPosition);
    await boardView.movePieceToCell(piece, newCellPosition);
}

async function handleGoToJailAction(action: GoToJailAction, piece: PiecePresenter) {
    await boardView.movePieceToJail(piece);
}

async function handleGetOutOfJailAction(action: GetOutOfJailAction, piece: PiecePresenter) {
    await boardView.movePieceFromJail(piece);
}

function handleChanceAction(action: ChanceAction) {
    reactChanceCardsManager.showCard(action.description);
}

function handleCommunityAction(action: CommunityAction) {
    reactTreasuryCardsManager.showCard(action.description);
}

function handlePayRentAction(action: PayRentAction, playerId: string) {
    const modalPopupData = {
        message: action.getHistoryMessage(playerId),
        yesCallback: () => {},
        noCallback: () => {},
        yesText: "Ok",
        noText: "No",
    };

    reactModalPopupManager.showPopup(modalPopupData);
}