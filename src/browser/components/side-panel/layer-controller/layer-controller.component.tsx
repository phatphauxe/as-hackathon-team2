import React from 'react';
import { ApiLayer, ApiMarker, AS, Pano } from '../../../../assets/models';
import { PTRLayer, PTRMarker, PTRVirtualRunner } from '../../../../assets/models/tillman.models';
import './layer-container.styles.scss';
import commonInfoIcon from '../../../../assets/images/info.svg';
import featureIcon from '../../../../assets/images/run.svg';
import kidsIcon from '../../../../assets/images/kids.svg';
import parkingMapIcon from '../../../../assets/images/park.svg';
import virtualIcon from '../../../../assets/images/virtual.svg';
import openPanel from '../../../../assets/images/open.svg';
import closePanel from '../../../../assets/images/collapse.svg';
import formImage from '../../../../assets/images/share virtual run form.png';
export interface StateProps {
	AS: AS | null,
	layers: PTRLayer[] | null,
	markers: PTRMarker[] | null,
	virtualRunners: PTRVirtualRunner[] | null,
	activePano: Pano | null,
}

export interface ControllerLayer {
	layer:PTRLayer,
	active:boolean,
	canDisable:boolean,
}

export interface LayerControllerProps extends StateProps {
	togglePanel: () => void;
	panelOpen: boolean;
};

const LayerController = (props:LayerControllerProps) => {
	const { layers, markers, AS, togglePanel, panelOpen, virtualRunners } = props;
	const [controllerLayers, setControllerLayers] = React.useState<ControllerLayer[] | null>(null);
	const [virtualRunnerLayer, setVirtualRunnerLayer] = React.useState<ApiLayer | null>(null);
	const [showForm, setShowForm] = React.useState<boolean>(false);
	const [layersLoaded, setLayersLoaded] = React.useState<boolean>(false);
	React.useEffect(() => {
		if(layers && layers.length && markers && markers.length && virtualRunners && virtualRunners.length) {
			const virtualRunnerLayerTemp:ApiLayer = {
				name: 'Virtual Runners',
				visible: false,
				markers: virtualRunners.map((vrRunner:PTRVirtualRunner) => {
					return {
						...vrRunner.marker,
					} as PTRMarker
				})
			};
			setVirtualRunnerLayer(virtualRunnerLayerTemp);
			setControllerLayers([...layers.map((layer:PTRLayer) => {
				return {
					layer,
					active: layer.name === "Feature Race",
					canDisable: false
				} as ControllerLayer;
			})]);
		}
	}, [layers, markers, virtualRunners]);

	React.useEffect(() => {
		if(controllerLayers && controllerLayers.length){
			(async () => {
					const layer = await AS?.getLayer(controllerLayers[0].layer.name);
					if(!layer && !layersLoaded){
						const vrLayer = virtualRunnerLayer || null;
						const setLayers = [...controllerLayers.map(
							(controllerLayer:ControllerLayer):ApiLayer => {
								return {
									name: controllerLayer.layer.name, 
									visible: controllerLayer.layer.name === 'Feature Race', 
									markers: controllerLayer.layer.markers.map(
										(marker:number) => {
											const foundMarker = markers?.find((m:PTRMarker) => { return m.id === marker});
											return foundMarker;
										}).filter((marker:PTRMarker | undefined) => !!marker) as ApiMarker[]
							} as ApiLayer }), ...[vrLayer]].filter(item => !!item) as ApiLayer[];
	
						AS?.sendData({layers: setLayers});
						setTimeout(() => {
							AS?.lookAt(108.7975010654751, 133.98772698064278);
							AS?.setZoom(0.6840800980278313);
							AS?.setFovRange(10, 120);	}, 500);
					}
					else if(!layersLoaded) {
						setLayersLoaded(true);
					}
			})();
		}
	}, [controllerLayers, AS, markers, virtualRunners, layersLoaded, setLayersLoaded, virtualRunnerLayer]);


	const toggleLayers = (layerID:string) => {
		controllerLayers?.forEach((controllerLayer:ControllerLayer) => {
			AS?.setLayerVisibility(controllerLayer.layer.name, false);
		});
		AS?.setLayerVisibility("Virtual Runners", false);
		AS?.setLayerVisibility(layerID, true);
		setShowForm(false);
		if(controllerLayers){
		setControllerLayers([...controllerLayers.map((controllerLayer:ControllerLayer):ControllerLayer => {
			if(controllerLayer.layer.name === layerID){
				return {...controllerLayer, active: true} as ControllerLayer;
			}
			else {
				return {...controllerLayer, active: false} as ControllerLayer;
			}
		})]);
		}
	}

	const setVirtualRunnersActive = () => {
		controllerLayers?.forEach((controllerLayer:ControllerLayer) => {
			AS?.setLayerVisibility(controllerLayer.layer.name, false);
			
		});
		AS?.setLayerVisibility('Virtual Runners',true);
		setShowForm(true);
	}
	const getIconFromName = (name:string) => {
		switch(name){
			case "Feature Race": return featureIcon;
			case "Kid's Race": return kidsIcon;
			case "Common Information": return commonInfoIcon;
			case "Parking Map": return parkingMapIcon;
			case "Virtual Run": return virtualIcon;
			default:
				return "";
		}
	}

	const getDisplayNameForLayer = (name:string) => {
		switch(name){
			case "Feature Race": return "Run Course";
			case "Kid's Race": return "Kids Run";
			case "Parking Map": return "Parking";
			case "Common Information": return "Race Village";
			case "Virtual Run": return "Virtual Race";
			default: return "";
		}
	}

	if(controllerLayers && controllerLayers.length) {
	return (
		<React.Fragment>
		<div className={`layer-controller-container${panelOpen ? ' open' : ''}`}>
			<div className={'toggle_panel'} onClick={togglePanel}>
				<div className={"icon-item"}>
					<img src={panelOpen ? closePanel : openPanel} alt={"guess you can't open this"} />
				</div>
				{panelOpen ? 
					<div className="text-item">
						<span>HIDE MENU</span>
					</div>
				: null}
			</div>
			<div className={'layer-container'}>
			{controllerLayers ? controllerLayers.map((controllerLayer:ControllerLayer) => {
				return (
					<div className={'layer-item'} onClick={() => {toggleLayers(controllerLayer.layer.name)}}>
						<div className={'icon-item'}>
							<img src={getIconFromName(controllerLayer.layer.name)} alt={"icon goes here"}/>
						</div>
						{ panelOpen ? 
							<div className={'text-item'}>
								<span>{getDisplayNameForLayer(controllerLayer.layer.name)}</span>
							</div>
							: null
						}
					</div>
				)
			}):
			null }
			
			<div className="line" />
			<div className={`layer-item virtual${panelOpen ? ' open' : ''}`} onClick={() => {setVirtualRunnersActive()}}>
				<div className={'top-line'}>
					<div className={'icon-item'}>
						<img src={virtualIcon} alt={'icon goes here'} />
					</div>
					{ panelOpen ? 
						<div className={'text-item'}>
							<span>Virtual Race</span>
						</div>
						: null
					}
				</div>
				{ panelOpen ? 
				<div className={'info'}>
					<span>
						share your 2020 race and see other participants
					</span>
				</div>
				: 
				null }
			</div>
			</div>

			
			
		</div>
		<div className={`run-form${showForm ? ' open' : ''}`}>
			<img src={formImage} alt={'not gonna show form'} />
		</div>
		</React.Fragment>
	)} 
	else {
		return null;
	}
};

export default LayerController;