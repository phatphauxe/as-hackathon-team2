import { Action } from 'redux';
import { State } from '../../../../assets/models/store.model';
import Selectors from '../../../../content/store/selectors';
import { ActionModels } from '../../../../content/store/actions';
import ASViewerComponent, { StateProps, DispatchProps } from './as-viewer.component';
import { AS } from '../../../../assets/models';
import { connect } from 'react-redux';

const mapStateToProps = (state:State):StateProps => {
	return {
		appLoaded: Selectors.App.selectAppLoaded(state),
		AS: Selectors.AS.selectAerialSphere(state),
	}
}

const mapDispatchToProps = (dispatch: (action:Action) => void):DispatchProps => {
	return {
		setAerialSphere: (aerialSphere:AS) => {
			dispatch(ActionModels.AS.setAerialSphere(aerialSphere));
		},
		setAppLoaded: () => {
			dispatch(ActionModels.App.appLoaded());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ASViewerComponent)