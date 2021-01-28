import { ApiMarker } from "./viewer.model";

export interface PTRVirtualRunner {
	name: string,
	marker: ApiMarker,
	totalTime: number,
	distance: number,
	photoRef?: string, // may be added later
}

export interface PTRLayer {
	id:string,
	name:string,
	markers: string[]
}

export interface PTRMarker extends ApiMarker {

}

