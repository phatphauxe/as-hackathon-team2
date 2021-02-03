import { connect } from 'react-redux';
import { Action } from 'redux';
import { ApiLayer } from '../../../../assets/models';
import { State } from '../../../../assets/models/store.model';
import { PTRMarker } from '../../../../assets/models/tillman.models';
import { ActionModels } from '../../../../content/store';
import Selectors from '../../../../content/store/selectors';
import LayerController, {StateProps, DispatchProps} from './layer-controller.component';

const mapStateToProps = (state:State):StateProps => {
	return {
		AS: Selectors.AS.selectAerialSphere(state),
		layers: Selectors.PTR.selectPTRLayers(state),
		markers: Selectors.PTR.selectPTRMarkers(state),
		activePano: Selectors.PTR.selectActivePano(state),
		virtualRunners: Selectors.PTR.selectPTRVirtualRunners(state),
	}
}

const mapDispatchToProps = (dispatch:(action:Action) => void): DispatchProps  => {
	return {
		setDisplayMarkersList: (markers:PTRMarker[] | null) => {
			dispatch(ActionModels.PTR.setDisplayedMarkers(markers));
		},
		setActiveLayer: (layer:ApiLayer) => {
			dispatch(ActionModels.PTR.setActiveLayer(layer));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerController);