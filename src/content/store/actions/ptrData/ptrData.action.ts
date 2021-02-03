import { ApiLayer, Pano } from "../../../../assets/models";
import { PTRLayer, PTRMarker, PTRVirtualRunner } from "../../../../assets/models/tillman.models";
import { Action } from "../action.helpers";
import { PTRTypesModel } from "./ptrData.helpers";


export const PTRTypes:PTRTypesModel = {
	toggleSidePanel: 'PTR_TOGGLE_SIDE_PANEL',
	setPTRLayers: 'PTR_SET_LAYERS',
	setPTRMarkers: 'PTR_SET_MARKERS',
	loadVirtualRunnerMarkers: 'PTR_LOAD_VIRTUAL_RUNNERS',
	setActivePano: 'PTR_SET_ACTIVE_PANO',
	setActiveMarker: 'PTR_SET_ACTIVE_MARKER',
	setDisplayedMarkers: 'PTR_SET_DISPLAYED_MARKERS',
	setShowMarkerList: 'PTR_SET_SHOW_MARKER_LIST',
	setActiveLayer: 'PTR_SET_ACTIVE_LAYER',
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

const setActiveMarker = (id:string | null):Action<string | null> => {
	return {
		type: PTRTypes.setActiveMarker,
		payload: id,
	}
}

const setDisplayedMarkers = (markers: PTRMarker[] | null):Action<PTRMarker[] | null> => {
	return {
		type: PTRTypes.setDisplayedMarkers,
		payload: markers,
	}
}

const setShowMarkerList = (visible:boolean):Action<boolean> => {
	return {
		type: PTRTypes.setShowMarkerList,
		payload: visible,
	}
}

const setActiveLayer = (layer:ApiLayer):Action<ApiLayer> => {
	return {
		type: PTRTypes.setActiveLayer,
		payload: layer,
	}
}

const PTRActions = {
		toggleSidePanel: toggleSidePanel,
		setMarkers: setMarkers,
		setLayers: setLayers,
		loadVirtualRunners: loadVirtualRunners,
		setActivePano: setActivePano,
		setActiveMarker: setActiveMarker,
		setDisplayedMarkers: setDisplayedMarkers,
		setShowMarkerList: setShowMarkerList,
		setActiveLayer: setActiveLayer,
		
};

export default PTRActions;