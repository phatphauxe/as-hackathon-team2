import { connect } from 'react-redux';
import { State } from '../../../../assets/models/store.model';
import Selectors from '../../../../content/store/selectors';
import LayerController, {StateProps} from './layer-controller.component';

const mapStateToProps = (state:State):StateProps => {
	return {
		AS: Selectors.AS.selectAerialSphere(state),
		layers: Selectors.PTR.selectPTRLayers(state),
		markers: Selectors.PTR.selectPTRMarkers(state),
		activePano: Selectors.PTR.selectActivePano(state),
		virtualRunners: Selectors.PTR.selectPTRVirtualRunners(state),
	}
}

export default connect(mapStateToProps)(LayerController);