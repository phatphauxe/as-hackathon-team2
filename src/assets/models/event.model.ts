export interface OnClickResponse {
	pan: number;
	tilt: number;
	lat: number;
	lon: number;
	lng: number;
	ele: number;
	input_lat: number;
	input_lon: number;
	input_lng: number;
}

export interface OnMarkerClickResponse {
	id: string | number;
}

export interface OnViewChangeResponse {
	eventName: string;
	azimuthAngle: number;
	polarAngle: number;
	zoom: number;
}