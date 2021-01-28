import { connect } from 'react-redux';
import { Action } from 'redux';
import { State } from '../../../assets/models/store.model';
import { ActionModels } from '../../../content/store';
import Selectors from '../../../content/store/selectors';
import SidePanel, { StateProps, DispatchProps} from './side-panel.component';

const mapStateToProps = (state:State):StateProps => {
	return {
		AS: Selectors.AS.selectAerialSphere(state),
		panelOpen: Selectors.PTR.selectPanelOpen(state),
	}
}

const mapDispatchToProps = (dispatch: (action:Action) => void):DispatchProps => {
	return {
		togglePanel: () => {
			dispatch(ActionModels.PTR.toggleSidePanel());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);