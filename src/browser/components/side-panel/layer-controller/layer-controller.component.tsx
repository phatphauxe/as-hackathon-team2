import React from 'react';
import { ApiLayer, ApiMarker, AS, Pano, SphereData } from '../../../../assets/models';
import { PTRLayer, PTRMarker } from '../../../../assets/models/tillman.models';

export interface StateProps {
	AS: AS | null,
	layers: PTRLayer[] | null,
	markers: PTRMarker[] | null,
	activePano: Pano | null,
}

export interface ControllerLayer {
	layer:PTRLayer,
	active:boolean,
	canDisable:boolean,
}
export type LayerControllerProps = StateProps;

const LayerController = (props:LayerControllerProps) => {
	const { layers, markers, AS } = props;
	const [controllerLayers, setControllerLayers] = React.useState<ControllerLayer[] | null>(null);
	const [layersLoaded, setLayersLoaded] = React.useState<boolean>(false);
	React.useEffect(() => {
		if(layers && layers.length && markers && markers.length) {
			setControllerLayers(layers.map((layer:PTRLayer) => {
				return {
					layer,
					active: layer.name === "feature_race",
					canDisable: false
				} as ControllerLayer;
			}));
		}
	}, [layers, markers]);

	React.useEffect(() => {
		if(controllerLayers && controllerLayers.length){
			(async () => {
					const layer = await AS?.getLayer(controllerLayers[0].layer.id);
					if(!layer && !layersLoaded){
						AS?.sendData({layers: controllerLayers.map(
							(controllerLayer:ControllerLayer):ApiLayer => {
								return {
									name: controllerLayer.layer.name, 
									visible: controllerLayer.layer.name === 'Feature Race', 
									markers: controllerLayer.layer.markers.map(
										(marker:string) => {
											const foundMarker = markers?.find((m:PTRMarker) => { return `${m.id}` === marker});
											return foundMarker;
										}).filter((marker:PTRMarker | undefined) => !!marker) as ApiMarker[]
							} as ApiLayer })
						});
					}
					else if(!layersLoaded) {
						setLayersLoaded(true);
					}
			})();
		}
	}, [controllerLayers, AS, markers, layersLoaded, setLayersLoaded]);


	const toggleLayers = (layerID:string) => {
		controllerLayers?.forEach((controllerLayer:ControllerLayer) => {
			AS?.setLayerVisibility(controllerLayer.layer.id, false);
		});
		
		AS?.setLayerVisibility(layerID, true);

		if(controllerLayers){
		setControllerLayers([...controllerLayers.map((controllerLayer:ControllerLayer):ControllerLayer => {
			if(controllerLayer.layer.id === layerID){
				return {...controllerLayer, active: true} as ControllerLayer;
			}
			else {
				return {...controllerLayer, active: false} as ControllerLayer;
			}
		})]);
		}
	}

	return (
		<div>
			
		</div>
	)
};

export default LayerController