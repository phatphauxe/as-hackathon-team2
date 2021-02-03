import React from 'react';
import { ApiLayer, AS, OnMarkerClickResponse } from '../../../assets/models';
import { PTRMarker } from '../../../assets/models/tillman.models';
import './marker-controller.style.scss';
import rightIcon from '../../../assets/images/right.svg';
import leftIcon from '../../../assets/images/left.svg';
import startLine from '../../../assets/images/start.svg';
import finishLine from '../../../assets/images/finish.svg';
import infoIcon from '../../../assets/images/info.svg';

export interface StateProps {
	showMarkerList: boolean;
	activeMarker: string | null;
	displayMarkers: PTRMarker[] | null;
	activeLayer: ApiLayer | null;
	AS: AS | null;
}

export interface DispatchProps {
	setActiveMarker: (marker:PTRMarker, layer: ApiLayer, AS:AS) => void;
}

export interface MarkerControllerProps extends StateProps, DispatchProps {
	setActiveMarkerOnClick: (response:OnMarkerClickResponse) => void;
}
const MarkerControllerComponent = (props:MarkerControllerProps) => {
	const { showMarkerList, activeMarker, setActiveMarkerOnClick, displayMarkers, activeLayer, AS, setActiveMarker} = props;

	React.useEffect(() => {
		if(AS && displayMarkers){
			AS.onMarkerClick(setActiveMarkerOnClick)
		}
	}, [AS, setActiveMarkerOnClick, activeLayer, displayMarkers]);
	const getDisplayNameForLayer = (name:string) => {
		switch(name){
			case "Feature Race": return "Run Course";
			case "Kid's Race": return "Kids Run";
			case "Parking Map": return "Parking";
			case "Common Information": return "Race Village";
			case "Virtual Run": return "Virtual Race";
			default: return "";
		}
	}

	const getImageFromName = (name:string) => {
		switch(true){
			case name.includes('Right'): return rightIcon;
			case name.includes('Left'): return leftIcon;
			case name.includes("Start"): return startLine;
			case name.includes("Finish"): return finishLine;
			default: return infoIcon;
		}
	} 
	return (
		
			displayMarkers && activeLayer && AS ?
				<div className={'marker-controller-container'}>
					<div className={'marker-container'}>
						<div className="layer-title">
							{getDisplayNameForLayer(activeLayer.name)}
						</div>
						<div className={'marker-list'}>
							
							{displayMarkers.map((marker:PTRMarker) => {
								return (
									<div id={`${marker.id}`} className={`marker-item${`${marker.id}` === activeMarker?.split('_')[1] ? ' active' :  ''}`} onClick={() => { setActiveMarker(marker, activeLayer, AS)}} key={marker.id}>
										<div className={`header${(marker?.name as string).length > 15 ? ' long' : ""}`}>{`${marker.id}` === activeMarker?.split('_')[1] ? <div className={"active-bar"} /> : null } <img className={'icon'} alt={'not loaded'} src={getImageFromName(marker.name as string)} />{marker.name}</div>
										{`${marker.id}` === activeMarker?.split('_')[1] ? <div className={'marker-description'}>{marker.description}</div> : null}
									</div>);
							})}
						</div>
					</div>
				</div>
			: null
		
	)
}

export default MarkerControllerComponent;