import { Pano } from "../../../assets/models";
import { PTRReducerState } from "../../../assets/models/store.model";
import { PTRLayer, PTRMarker, PTRVirtualRunner } from "../../../assets/models/tillman.models";
import { ActionTypes } from "../actions";
import { Action } from "../actions/action.helpers";

export type PTRReducerAction = PTRLayer[] | PTRMarker[] | PTRVirtualRunner[] | Pano | boolean | null;

export const defaultPTRReducer:PTRReducerState = {
	panelOpen: false,
	layers: [],
	markers: [],
	virtualRunners: [],
	activePano: null,
}

const PTRReducer = (state:PTRReducerState = defaultPTRReducer, action:Action<PTRReducerAction>) => {
	switch(action.type){
		case ActionTypes.PTR.toggleSidePanel: {
			return {...state, panelOpen: !state.panelOpen};
		}
		case ActionTypes.PTR.setPTRLayers: {
			const payload = action.payload as PTRLayer[];
			return {...state, layers: payload};
		}
		case ActionTypes.PTR.setPTRMarkers: {
			const payload = action.payload as PTRMarker[];
			return {...state, markers: payload};
		}
		case ActionTypes.PTR.loadVirtualRunnerMarkers: {
			const payload = action.payload as PTRVirtualRunner[];
			return {...state, virtualRunners: payload};
		}
		case ActionTypes.PTR.setActivePano: {
			const payload = action.payload as Pano;
			return {...state, activePano: payload};
		}
		default:
			return state;
	}
}
export default PTRReducer;