import { Pano } from "../../../../assets/models";
import { PTRLayer, PTRMarker, PTRVirtualRunner } from "../../../../assets/models/tillman.models";
import { Action } from "../action.helpers";
import { PTRTypesModel } from "./ptrData.helpers";


export const PTRTypes:PTRTypesModel = {
	toggleSidePanel: 'PTR_TOGGLE_SIDE_PANEL',
	setPTRLayers: 'PTR_SET_LAYERS',
	setPTRMarkers: 'PTR_SET_MARKERS',
	loadVirtualRunnerMarkers: 'PTR_LOAD_VIRTUAL_RUNNERS',
	setActivePano: 'PTR_SET_ACTIVE_PANO',
}

const toggleSidePanel = ():Action<null> => {
	return {
		type: PTRTypes.toggleSidePanel,
		payload: null,
	}
};

const setLayers = (layers: PTRLayer[]):Action<PTRLayer[]> => {
	return {
		type: PTRTypes.setPTRLayers,
		payload: layers,
	}
};

const setMarkers = (markers:PTRMarker[]):Action<PTRMarker[]> => {
	return {
		type: PTRTypes.setPTRMarkers,
		payload: markers,
	}
}

const loadVirtualRunners = (virtualRunners: PTRVirtualRunner[]):Action<PTRVirtualRunner[]> => {
	return {
		type: PTRTypes.loadVirtualRunnerMarkers,
		payload: virtualRunners,
	}
}

const setActivePano = (activePano:Pano):Action<Pano> => {
	return {
		type: PTRTypes.setActivePano,
		payload: activePano
	}
}

const PTRActions = {
		toggleSidePanel: toggleSidePanel,
		setMarkers: setMarkers,
		setLayers: setLayers,
		loadVirtualRunners: loadVirtualRunners,
		setActivePano: setActivePano,
		
};

export default PTRActions;