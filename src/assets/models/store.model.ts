import { AS, Pano } from ".";
import { PTRLayer, PTRMarker, PTRVirtualRunner } from "./tillman.models";

export interface ASReducerState {
	AS: AS | null;
}

export interface AppDataReducerState {
	appLoaded: boolean;
	data: string[] | null;
}

export interface PTRReducerState {
	panelOpen: boolean;
	layers: PTRLayer[] | null;
	markers: PTRMarker[] | null;
	virtualRunners: PTRVirtualRunner[] | null;
	activePano: Pano | null;
}
export interface State {
	appData: AppDataReducerState,
	aerialSphereData: ASReducerState,
	ptrData: PTRReducerState,
}