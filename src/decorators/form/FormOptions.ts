import { FormConfiguration } from "./Form";
import { InputOptions } from "./Input";

export interface FormOptions {
	resolver: any; //TODO: type
	form?: FormConfiguration;
	inputs?: InputOptions[];
}
