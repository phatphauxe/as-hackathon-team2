import { ApiMarker } from "./viewer.model";

export interface PTRVirtualRunner {
	name: string,
	marker: ApiMarker,
	totalTime: number,
	distance: number,
	photoRef?: string, // may be added later
}

export interface PTRLayer {
	name:string,
	visible: string,
	markers: number[]
}

export interface PTRMarker extends ApiMarker {

}

