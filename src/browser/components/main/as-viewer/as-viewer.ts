import { Action } from 'redux';
import { State } from '../../../../assets/models/store.model';
import Selectors from '../../../../content/store/selectors';
import { ActionModels } from '../../../../content/store/actions';
import ASViewerComponent, { StateProps, DispatchProps } from './as-viewer.component';
import { AS, Pano } from '../../../../assets/models';
import { connect } from 'react-redux';

const mapStateToProps = (state:State):StateProps => {
	return {
		appLoaded: Selectors.App.selectAppLoaded(state),
		AS: Selectors.AS.selectAerialSphere(state),
		activeMarker: Selectors.PTR.selectActiveMarker(state),
	}
}

const mapDispatchToProps = (dispatch: (action:Action) => void):DispatchProps => {
	return {
		setAerialSphere: (aerialSphere:AS) => {
			dispatch(ActionModels.AS.setAerialSphere(aerialSphere));
		},
		setAppLoaded: () => {
			dispatch(ActionModels.App.appLoaded());
		},
		setActivePano: (activePano:Pano) => {
			dispatch(ActionModels.PTR.setActivePano(activePano))
		},
		setActiveMarker: (markerId:string | null) => {
			dispatch(ActionModels.PTR.setActiveMarker(markerId));
		},
		setShowMarkerList: (visible:boolean) => {
			dispatch(ActionModels.PTR.setShowMarkerList(visible));
		}

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ASViewerComponent)