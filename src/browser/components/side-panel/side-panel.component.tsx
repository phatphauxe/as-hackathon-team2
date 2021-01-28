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
		<div className="side-panel-container">
			<div onClick={togglePanel}>
				<div className={"toggle_icon"} />
				{/* <img src={toggle_icon} height={'50px'} width={'50px'} /> */}
			</div>

			<div className={`panel-overlay${panelOpen ? " open" : ""}`}>
				<div onClick={togglePanel}>
					<div className={"toggle_icon"} />
					{/* <img src={toggle_icon} height={'50px'} width={'50px'} /> */}
				</div>
				<LayerController />
			</div>
		</div>
	)

}

export default SidePanel;