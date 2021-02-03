import React from 'react';
import { ApiLayer, AS, OnMarkerClickResponse } from '../../../assets/models';
import { PTRMarker } from '../../../assets/models/tillman.models';
import './marker-controller.style.scss';
import rightIcon from '../../../assets/images/right.svg';
import leftIcon from '../../../assets/images/left.svg';
import startLine from '../../../assets/images/start.svg';
import finishLine from '../../../assets/images/finish.svg';
import infoIcon from '../../../assets/images/info.svg';
import parkingIcon from '../../../assets/images/park.svg';
import runnerImg1 from '../../../assets/images/patrun-sample-virtual-image1.jpg';
import runnerImg2 from '../../../assets/images/patrun-sample-virtual-image2.jpg';
import runnerImg3 from '../../../assets/images/patrun-sample-virtual-image3.jpg';
import runnerImg4 from '../../../assets/images/patrun-sample-virtual-image4.jpg';
import runnerImg5 from '../../../assets/images/patrun-sample-virtual-image5.jpg';

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
			case "Virtual Runners": return "Virtual Race";
			default: return "";
		}
	}

	const getImageFromName = (name:string) => {
		switch(true){
			case name.includes('Right'): return rightIcon;
			case name.includes('Left'): return leftIcon;
			case name.includes("Start"):
			case name.includes("Closure"):
				return startLine;
			case name.includes("Park"):
				return parkingIcon;
			case name.includes("Finish"): return finishLine;
			default: return infoIcon;
		}
	} 

	const getImageByRunnerName = (name:string) => {
		switch(name){
			case "Julie Smith": return runnerImg1;
			case "Bill Sampson": return runnerImg2;
			case "Roxanna Malcom": return runnerImg3;
			case "Colin Trenton": return runnerImg4;
			case "Julie Garcia": return runnerImg5;
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
									<div id={`${marker.id}`} className={`marker-item${`${marker.id}` === activeMarker?.split('_')[1] ? ' active' :  ''}${(marker.description as string).length > 200 || activeLayer.name === "Virtual Runners" ? ' long' : ''}`} onClick={() => { setActiveMarker(marker, activeLayer, AS)}} key={marker.id}>
										<div className={`header${(marker?.name as string).length > 15 ? ' long' : ""}`}>{`${marker.id}` === activeMarker?.split('_')[1] ? <div className={"active-bar"} /> : null } <img className={'icon'} alt={'not loaded'} src={getImageFromName(marker.name as string)} />{marker.name}</div>
										{activeLayer.name === "Virtual Runners" ? <div className={'marker-image'}> <img src={getImageByRunnerName(marker.name as string)} alt={'no alt'} /></div> : null }
										{`${marker.id}` === activeMarker?.split('_')[1] ? <div className={`marker-description${(marker.description as string).length > 200 ? ' long' : ''}`}>{marker.description}</div> : null}
									</div>);
							})}
						</div>
					</div>
				</div>
			: null
		
	)
}

export default MarkerControllerComponent;