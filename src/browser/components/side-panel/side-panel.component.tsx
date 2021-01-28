import React from 'react';
//import toggle_icon from '../../../../assets/icons/toggle_icon.svg';
import { AS } from '../../../assets/models';
import LayerController from './layer-controller/layer-controller';
import './side-panel.styles.scss';

export interface StateProps {
	AS: AS | null,
	panelOpen: boolean,
}

export interface DispatchProps {
	togglePanel: () => void;
}

export type SidePanelProps = StateProps & DispatchProps;

const SidePanel = (props: SidePanelProps) => {
	const { AS, panelOpen, togglePanel } = props;

	return (
		<div className={`side-panel-container${panelOpen ? " open" : ""}`}>
			<LayerController togglePanel={togglePanel} panelOpen={panelOpen} />
		</div>
	)

}

export default SidePanel;