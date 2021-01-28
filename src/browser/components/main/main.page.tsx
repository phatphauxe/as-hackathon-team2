import React  from 'react';
import { AS, Pano } from '../../../assets/models';
import ASViewer from './as-viewer/as-viewer';
import './main.styles.scss';

export interface StateProps {
	AS: AS | null;
	activePano: Pano | null;
}

export interface DispatchProps {
	loadAllPTRData: (activePano: Pano) => void;
}

export type MainPageProps = StateProps & DispatchProps; 

const MainPage = (props: MainPageProps) => {
	const { AS, activePano, loadAllPTRData } = props;

	React.useEffect(() => {
		(async () => {
			if(AS && !activePano){
				const activePano = await AS.getActivePano();
				loadAllPTRData(activePano);
			}
		})()
	}, [AS, loadAllPTRData, activePano]);

	return (
		<div className={'main-page-container'}>
			<ASViewer />
			<div className="sharethis-inline-share-buttons"></div>
		</div>
	);
}

export default MainPage;