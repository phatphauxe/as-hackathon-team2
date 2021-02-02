export interface ApiMarker {
	id: number | string;
	description?: string;
	lat: number;
	lng: number;
	name?: string;
	icon?: string;
	style?: object
}

export interface ApiLayer {
	name: string;
	visible?: boolean;
	markers: Array<ApiMarker>;
}

export interface Position {
	lat: number;
	lng: number;
}
  
export interface Marker {
	position: Position
}
  
export interface PanoMarker {
	marker: Marker
}
  
export interface NearestPano {
	distance: number;
	panoMarker: PanoMarker;
}

export interface LookAt {
    pan: number;
    tilt: number;
}

export type WidgetType = 'fullScreen' | 'help' | 'info' | 'view_toggle' | 'navigation';

export interface UIOptions {
    [key: string]: boolean;
}