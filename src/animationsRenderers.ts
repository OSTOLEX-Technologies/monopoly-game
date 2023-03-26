import {RootState} from "@react-three/fiber";
import * as THREE from "three";
import {PiecePresenter} from "./board";

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
    private readonly diff: THREE.Vector3;
    private readonly movement: THREE.Vector3;

    constructor(
        private piece: PiecePresenter,
        private endCord: THREE.Vector3,
        private interval: number = 0.01,
        private callback: () => void = () => {}
    ) {
        super();
        const startCord = piece.object3D!.position.clone();
        this.diff = endCord.clone().sub(startCord);
        this.movement = new THREE.Vector3(this.diff.x * this.interval, this.diff.y * this.interval, this.diff.z * this.interval);
    }

    draw(rootState: RootState): void {
        if (this.endCord.distanceTo(this.piece.object3D!.position) <= this.interval) {
            this.piece.object3D!.position.set(this.endCord.x, this.endCord.y, this.endCord.z);
            this.setDrawn()
            this.callback();
            return;
        }
        this.piece.object3D!.position.add(this.movement)
    }
}