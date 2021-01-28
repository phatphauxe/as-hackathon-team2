import { connect } from 'react-redux';
import { Action } from 'redux';
import { Pano } from '../../../assets/models';
import { State } from '../../../assets/models/store.model';
import { ActionModels } from '../../../content/store';
import Selectors from '../../../content/store/selectors';
import MainPage, { StateProps, DispatchProps } from './main.page';
//import viewerData from '';
//import virtualRunnerData from '';
const mapStateToProps = (state:State):StateProps => {
	return {
		AS: Selectors.AS.selectAerialSphere(state),
		activePano: Selectors.PTR.selectActivePano(state),
	}
}

const mapDispatchToProps = (dispatch:(action: Action) => void):DispatchProps => {
	return {
		loadAllPTRData: (activePano: Pano) => {
			dispatch(ActionModels.PTR.setActivePano(activePano));
			//dispatch(ActionModels.PTR.setLayers(viewerData.layers));
			//dispatch(ActionModels.PTR.setMarkers(viewerData.markers));
			//dispatch(ActionModels.PTR.setVirtualRunners(virtualRunnerData.data));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);