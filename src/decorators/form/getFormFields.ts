import { AnyClass } from "../../types/AnyClass";
import { FormOptions } from "./FormOptions";
import { getInputFields } from "./Input";
import { getFormConfiguration } from "./Form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

export function getFormFields<T extends AnyClass>(entityClass: T): FormOptions {
	console.log(entityClass);
	return {
		resolver: classValidatorResolver(entityClass as any),
		form: getFormConfiguration(entityClass),
		inputs: getInputFields<T>(entityClass),
	};
}
