import React from 'react';
import {AS, OnClickResponse, OnMarkerClickResponse, OnViewChangeResponse, Pano, SphereData } from '../../../../assets/models';
import {loadViewer} from '../../../../content/http';
import { ViewerENV } from '../../../../content/http/loadViewer/loadViewer';
import './as-viewer.styles.scss';

export interface StateProps {
	appLoaded: boolean,
	AS: AS | null;
	activeMarker: string | null;
}

export interface DispatchProps {
	setAerialSphere: (aerialSphere:AS) => void;
	setAppLoaded: () => void;
	setActivePano: (activePano:Pano) => void;
	setActiveMarker: (markerId:string | null) => void;
	setShowMarkerList: (visible:boolean) => void;
}

export type ASViewerProps = StateProps & DispatchProps;
declare global {
	
	var AerialSphere:  new (id:string, className:string, data?:SphereData) => AS;
	
}

/// This loads the viewer and provides access to the AerialSphere api
const ASViewer = (props:ASViewerProps) => {
	const { AS, appLoaded, activeMarker, setAerialSphere, setAppLoaded, setActivePano, setActiveMarker, setShowMarkerList } = props;
	
	React.useEffect(() => {
		
		if(appLoaded){
			const aerialSphere = new AerialSphere('as-viewer', 'aerial-sphere-container', {});
			setAerialSphere(aerialSphere);
		}
		else {
			// loadViewer ( callback: () => void, useDev?:boolean, key?:string, env?:string)
			loadViewer(() => { setAppLoaded()}, true, "84b47496-db41-400c-ad5a-05e1c2e66e7b", 'prod' as ViewerENV); 
		}
	}, [appLoaded, setAppLoaded, setAerialSphere])

	React.useEffect(() => {
		if(AS){
			AS.openPanoramaById(15184);
			(async () => {
				const activePano = await AS.getActivePano();
				setActivePano(activePano)
				AS.onClick(async (response:OnClickResponse) => {
					const activePano = await AS.getActivePano();
					if(activePano.id !== 15184){
						AS.openPanoramaById(15184);
					}
				})
			})()
			AS.setWidgetEnabled(["fullScreen", "help", "info", "view_toggle", "navigation"], false);
			
			
			// AS.onViewChange((response:OnViewChangeResponse) => {
			// 	switch(response.eventName){
			// 		case "wake": setShowMarkerList(false); break;
			// 		case "sleep": setShowMarkerList(true); break;
			// 		default: return;
			// 	}
			// });
		}
	}, [AS]);
	return (
		<div id={'as-viewer'} className={'aerial-sphere-container'}/>
	);
}

export default ASViewer;