import { State } from "../../../assets/models/store.model";

export const selectPanelOpen = (state:State) => state?.ptrData?.panelOpen ?? false;

export const selectPTRLayers = (state:State) => state?.ptrData?.layers ?? null;
export const selectPTRMarkers = (state:State) => state?.ptrData?.markers ?? null;
export const selectPTRVirtualRunners = (state:State) => state?.ptrData.virtualRunners ?? null;
export const selectActivePano = (state:State) => state?.ptrData.activePano ?? null;