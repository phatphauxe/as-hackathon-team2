import  PTRActions, { PTRTypes } from "./ptrData/ptrData.action";
import { PTRTypesModel } from "./ptrData/ptrData.helpers";
import { AerialSphereActions, ASTypes } from "./aerialSphereData/aerialSphereData.action";
import { ASTypesModel } from "./aerialSphereData/aerialSphereData.helpers";

import AppActions, { AppTypes } from "./appData/appData.action";
import { AppTypesModel } from "./appData/appData.helpers";
interface ActionTypesModel {
	App: AppTypesModel,
	AS: ASTypesModel,
	PTR: PTRTypesModel,
}

export const ActionTypes:ActionTypesModel = {
	App: AppTypes,
	AS: ASTypes,
	PTR: PTRTypes,
}

export const ActionModels = {
	App: AppActions,
	AS: AerialSphereActions,
	PTR: PTRActions,
}