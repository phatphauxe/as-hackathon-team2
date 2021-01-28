import React  from 'react';
import { AS, Pano } from '../../../assets/models';
import SidePanel from '../side-panel/side-panel';
import ASViewer from './as-viewer/as-viewer';
import './main.styles.scss';

export interface StateProps {
	AS: AS | null;
	activePano: Pano | null;
}

export interface DispatchProps {
	loadAllPTRData: () => void;
}

export type MainPageProps = StateProps & DispatchProps; 

const MainPage = (props: MainPageProps) => {
	const { AS, activePano, loadAllPTRData } = props;

	React.useEffect(() => {
		
		if(AS && activePano){
				
			loadAllPTRData();
		}
			
			
	
	}, [AS, loadAllPTRData, activePano]);

	return (
		<div className={'main-page-container'}>
			<SidePanel />
			<ASViewer />
			<div className="sharethis-inline-share-buttons"></div>
		</div>
	);
}

export default MainPage;