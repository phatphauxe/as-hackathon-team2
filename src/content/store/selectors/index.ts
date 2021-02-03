import { ApiLayer, AS, Pano } from '../../../assets/models';
import { State } from '../../../assets/models/store.model';
import * as AppSelectors from './appData.selector';
import * as ASSelectors from './aerialSphereData.selector';
import * as PTRSelectors from './ptrData.selector';
import { PTRLayer, PTRMarker, PTRVirtualRunner } from '../../../assets/models/tillman.models';
export interface AppSelectorsModel {
	selectAppLoaded: (state:State) => boolean;
	selectAppData: (state:State) => string[] | null;
}

export interface ASSelectorsModel {
	selectAerialSphere: (state:State) => AS | null;
}

export interface PTRSelectorsModel {
	selectPanelOpen: (state:State) => boolean;
	selectPTRLayers: (state:State) => PTRLayer[] | null;
	selectPTRMarkers: (state:State) => PTRMarker[] | null;
	selectPTRVirtualRunners: (state:State) => PTRVirtualRunner[] | null;
	selectActivePano: (state:State) => Pano | null;
	selectActiveMarker: (state:State) => string | null;
	selectShowMarkerList: (state:State) => boolean;
	selectDisplayMarkers: (state:State) => PTRMarker[] | null;
	selectActiveLayer: (state:State) => ApiLayer | null;
}

export interface SelectorsModel {
	App: AppSelectorsModel,
	AS: ASSelectorsModel,
	PTR: PTRSelectorsModel,
}
const Selectors:SelectorsModel = {
	App: AppSelectors,
	AS: ASSelectors,
	PTR: PTRSelectors
}

export default Selectors;