import { getMetadataStorage } from "class-validator";
import { getClassCrudData } from "../decorators/Crud";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { getCellFields } from "../decorators/Cell";
import { ScreenCreatorData } from "../types/ScreenCreatorData";
import { getInputFields } from "../decorators/Input";

export function getFields<T>(key: string, entityClass: T): ScreenCreatorData {
	const metadataStorage = getMetadataStorage();
	const targetMetadata = metadataStorage.getTargetValidationMetadatas(entityClass as any, "", false, false);
	const crud = getClassCrudData(entityClass);
	return {
		resolver: classValidatorResolver(entityClass as any),
		fields: Array.from(new Set(targetMetadata.map((meta) => meta.propertyName))),
		inputs: getInputFields(entityClass),
		cells: getCellFields(entityClass),
		crud: crud,
		path: "/" + (crud?.controller ?? key),
	};
}
