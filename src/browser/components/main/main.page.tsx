import React  from 'react';
import { AS, Pano } from '../../../assets/models';
import SidePanel from '../side-panel/side-panel';
import ASViewer from './as-viewer/as-viewer';
import './main.styles.scss';
import MarkerController from '../marker-controller/marker-controller';
import patsRunIcon from '../../../assets/images/patsRunIcon.png';
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
	const [appReady, setAppReady] = React.useState<boolean>(false);


	React.useEffect(() => {
		
		if(AS && activePano){
				
			loadAllPTRData();
		}
			
			
	
	}, [AS, loadAllPTRData, activePano, setAppReady]);

	React.useEffect(() => {
		if(activePano && !appReady) {
			setAppReady(true);
		}
	}, [setAppReady, activePano, appReady])

	return (
		<div className={'main-page-container'}>
			{!appReady ? <div className="cover-image">
				<img src={patsRunIcon} alt={'pats run'} /> </div> : null}
			{ AS ? 
			<React.Fragment>
				<SidePanel />
				<MarkerController />
			</React.Fragment> : null}
			<ASViewer />
			
			<div className="sharethis-inline-share-buttons"></div>
			
		</div>
	);
}

export default MainPage;