import { State } from "../../../assets/models/store.model";

export const selectPanelOpen = (state:State) => state?.ptrData?.panelOpen ?? false;

export const selectPTRLayers = (state:State) => state?.ptrData?.layers ?? null;
export const selectPTRMarkers = (state:State) => state?.ptrData?.markers ?? null;
export const selectPTRVirtualRunners = (state:State) => state?.ptrData.virtualRunners ?? null;
export const selectActivePano = (state:State) => state?.ptrData?.activePano ?? null;
export const selectActiveMarker = (state:State) => state?.ptrData?.activeMarker ?? null;
export const selectShowMarkerList = (state:State) => state?.ptrData?.showMarkerList ?? false;
export const selectDisplayMarkers = (state:State) => state?.ptrData?.displayMarkers ?? null;
export const selectActiveLayer = (state:State) => state?.ptrData?.activeLayer ?? null;

