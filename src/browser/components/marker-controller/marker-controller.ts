import { connect } from 'react-redux';
import { Action } from 'redux';
import { ApiLayer, AS, OnMarkerClickResponse } from '../../../assets/models';
import { State } from '../../../assets/models/store.model';
import { PTRMarker } from '../../../assets/models/tillman.models';
import { ActionModels } from '../../../content/store';
import Selectors from '../../../content/store/selectors';
import MarkerControllerComponent, { StateProps, DispatchProps, MarkerControllerProps } from './marker-controller.component';

const mapStateToProps = (state:State):StateProps => {
	return {
		displayMarkers: Selectors.PTR.selectDisplayMarkers(state),
		activeMarker: Selectors.PTR.selectActiveMarker(state),
		showMarkerList: Selectors.PTR.selectShowMarkerList(state),
		activeLayer: Selectors.PTR.selectActiveLayer(state),
		AS: Selectors.AS.selectAerialSphere(state),
	};
}

const mapDispatchToProps = (dispatch: (action:Action) => void) :DispatchProps => {
	return {
		setActiveMarker: (marker:PTRMarker,activeLayer:ApiLayer, AS:AS) => {
			AS?.setZoom(0.6840800980278313);
			if(marker.pan && marker.tilt){
				AS.lookAt(marker.pan, marker.tilt);
			}
			dispatch(ActionModels.PTR.setActiveMarker(`${activeLayer.name}_${marker.id}`))
		}
	};
}

export const mergeProps = (stateProps:StateProps, dispatchProps:DispatchProps): MarkerControllerProps => {
	const { AS, displayMarkers, activeLayer} = stateProps;
	const { setActiveMarker } = dispatchProps;
	return {
		...stateProps,
		...dispatchProps,
		setActiveMarkerOnClick: (response:OnMarkerClickResponse) => {
			console.log(response.id);
			if(activeLayer && displayMarkers && AS){
				const marker = displayMarkers.find((m:PTRMarker) => {
					return `${m.id}` === (response.id as string).split("_")[1];
				});
				if(marker){
					setActiveMarker(marker, activeLayer, AS);
				}
			}
			
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MarkerControllerComponent);
// to show line course move to this position 
//{"pan":90.633071807889,"tilt":179.67619637732307} {"cameraZoom":0.224366202630684}

// {
// 	"name": "Key Race Points",
// 	"visible": false,
// 	"markers": [
// 		101, //start
// 		104, //mile marker 1
// 		108, //mile marker 2
// 		113, //mile marker 3
// 		118, //mile marker 4
// 		120 //finish
// 	]
// },