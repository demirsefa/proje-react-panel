import "reflect-metadata";

const LIST_KEY = "List";

export interface ListOptions {}

export function List(options?: ListOptions): ClassDecorator {
	return (target: Function) => {
		if (options) {
			Reflect.defineMetadata(LIST_KEY, options, target);
		}
	};
}

export function getClassListData(entityClass: any): ListOptions | undefined {
	return Reflect.getMetadata(LIST_KEY, entityClass);
}
