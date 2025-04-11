import { getMetadataStorage } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ScreenCreatorData } from "../types/ScreenCreatorData";
import { getInputFields } from "../decorators/form/Input";
import { getClassListData } from "../decorators/list/List";
import { getCellFields } from "../decorators/list/GetCellFields";
import { AnyClass } from "../types/AnyClass";

export function getFields<T extends AnyClass>(key: string, entityClass: T): ScreenCreatorData {
	const metadataStorage = getMetadataStorage();
	const targetMetadata = metadataStorage.getTargetValidationMetadatas(entityClass as any, "", false, false);
	const listData = getClassListData(entityClass);
	return {
		resolver: classValidatorResolver(entityClass as any),
		cells: getCellFields(entityClass),
		list: listData,
		fields: Array.from(new Set(targetMetadata.map((meta) => meta.propertyName))),
		inputs: getInputFields<T>(entityClass),
		crud: { controller: "" },
		path: "/" + key,
	};
}
