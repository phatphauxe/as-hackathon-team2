import { connect } from 'react-redux';
import { Action } from 'redux';
import { Pano } from '../../../assets/models';
import { State } from '../../../assets/models/store.model';
import { ActionModels } from '../../../content/store';
import Selectors from '../../../content/store/selectors';
import MainPage, { StateProps, DispatchProps } from './main.page';
import viewerData from '../../../assets/marker-data/pt_markerdata.json';
import { PTRLayer, PTRMarker, PTRVirtualRunner } from '../../../assets/models/tillman.models';
import virtualRunners from '../../../assets/marker-data/virtual_runners.json';
const mapStateToProps = (state:State):StateProps => {
	return {
		AS: Selectors.AS.selectAerialSphere(state),
		activePano: Selectors.PTR.selectActivePano(state),
	}
}

const mapDispatchToProps = (dispatch:(action: Action) => void):DispatchProps => {
	return {
		loadAllPTRData: () => {
			
			dispatch(ActionModels.PTR.setLayers((viewerData.layers as unknown) as PTRLayer[]));
			dispatch(ActionModels.PTR.setMarkers((viewerData.markers as unknown) as PTRMarker[]));
			dispatch(ActionModels.PTR.loadVirtualRunners((virtualRunners.virtual_runners as unknown) as PTRVirtualRunner[]));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);