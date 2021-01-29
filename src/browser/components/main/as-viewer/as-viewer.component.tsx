import React from 'react';
import {AS, Pano, SphereData } from '../../../../assets/models';
import {loadViewer} from '../../../../content/http';
import { ViewerENV } from '../../../../content/http/loadViewer/loadViewer';
import { selectActivePano } from '../../../../content/store/selectors/ptrData.selector';
import './as-viewer.styles.scss';

export interface StateProps {
	appLoaded: boolean,
	AS: AS | null;
}

export interface DispatchProps {
	setAerialSphere: (aerialSphere:AS) => void;
	setAppLoaded: () => void;
	setActivePano: (activePano:Pano) => void;
}

export type ASViewerProps = StateProps & DispatchProps;
declare global {
	
	var AerialSphere:  new (id:string, className:string, data?:SphereData) => AS;
	
}

/// This loads the viewer and provides access to the AerialSphere api
const ASViewer = (props:ASViewerProps) => {
	const { AS, appLoaded, setAerialSphere, setAppLoaded, setActivePano } = props;
	
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
				setActivePano(await AS.getActivePano())
				AS.lookAt(108.7975010654751, 133.98772698064278);
				AS.setZoom(0.6840800980278313);
			})()
			AS.setWidgetEnabled(["fullScreen", "help", "info", "view_toggle", "navigation"], false);
			AS.setFovRange(10, 90);	
			AS.lookAt(108.7975010654751, 133.98772698064278);
			AS.setZoom(0.6840800980278313);
		}
	}, [AS]);
	return (
		<div id={'as-viewer'} className={'aerial-sphere-container'} />
	);
}

export default ASViewer;