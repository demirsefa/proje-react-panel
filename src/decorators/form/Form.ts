import "reflect-metadata";
import { AnyClass } from "../../types/AnyClass";

const FORM_METADATA_KEY = "FormMetadata"; // More descriptive name indicating it's a metadata key

export interface FormConfiguration {} // Better describes that this is configuration/options for the form

export function FormDecorator(options?: FormConfiguration): ClassDecorator {
	return (target: Function) => {
		if (options) {
			Reflect.defineMetadata(FORM_METADATA_KEY, options, target);
		}
	};
}

export function getFormConfiguration(entityClass: AnyClass): FormConfiguration | undefined {
	return Reflect.getMetadata(FORM_METADATA_KEY, entityClass);
}
