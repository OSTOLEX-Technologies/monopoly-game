import {RootState} from "@react-three/fiber";
import * as THREE from "three";
import {PiecePresenter, CellPresenter} from "./board";

export abstract class AnimationRenderer {
    private drawn = false;

    // override this method. When draw ended, set drawn = true
    abstract draw(rootState: RootState): void;

    render(rootState: RootState) {
        if (!this.drawn)
            this.draw(rootState);
    };

    getDrawn(): boolean {
        return this.drawn;
    }

    setDrawn() {
        this.drawn = true;
    }
}

export class AnimationRenderersManager {
    private callbacks: AnimationRenderer[] = [];

    public add(callback: AnimationRenderer) {
        this.callbacks.push(callback);
    }

    private removeDrawn() {
        this.callbacks = this.callbacks.filter(callback => !callback.getDrawn());
    }

    public render(rootState: RootState) {
        this.callbacks.forEach(callback => callback.render(rootState));
        this.removeDrawn();
    }

    public clear() {
        this.callbacks = [];
    }

    public getCallbacks(): AnimationRenderer[] {
        return this.callbacks;
    }
}


export class PieceMoveAnimationRenderer extends AnimationRenderer {
    private readonly interval: number;
    private readonly distance: number;
    private readonly movement: THREE.Vector3;

    constructor(
        private piece: PiecePresenter,
        private from: CellPresenter,
        private to: CellPresenter,
        private duration: number = 1000,
        private callback: () => void = () => {}
    ) {
        super();
        const frameMs = 1000 / 60;
        const diff = to.getCenter3().sub(from.getPiecePosition(piece));
        this.distance = diff.length();
        this.interval = this.distance / (duration * 10 / frameMs);
        this.movement = new THREE.Vector3(diff.x * this.interval, diff.y, diff.z * this.interval);
        console.log("PieceMoveAnimationRenderer", this.interval, this.distance, this.movement)
    }

    draw(rootState: RootState): void {
        const startCoord = this.piece.object3D!.position;
        const endCoord = this.to.getCenter3();
        if (endCoord.distanceTo(startCoord) <= this.interval) {
            this.setDrawn()
            this.callback();
            return;
        }
        this.piece.object3D!.position.add(this.movement)
    }
}