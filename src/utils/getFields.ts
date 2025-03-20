import { getMetadataStorage } from "class-validator";
import { getClassCrudData } from "../decorators/Crud";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { getCellFields } from "../decorators/Cell";
import { ScreenCreatorData } from "../types/ScreenCreatorData";

export function getFields<T>(entityClass: T): ScreenCreatorData<T> {
	const metadataStorage = getMetadataStorage();
	const targetMetadata = metadataStorage.getTargetValidationMetadatas(entityClass as any, "", false, false);
	const crud = getClassCrudData(entityClass);
	return {
		resolver: classValidatorResolver(entityClass as any),
		fields: Array.from(new Set(targetMetadata.map((meta) => meta.propertyName))),
		cells: getCellFields(entityClass),
		crud: crud!,
	};
}
