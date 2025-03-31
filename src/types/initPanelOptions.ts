type AnyClass = abstract new (...args: any[]) => any;

export interface InitPanelOptions {
	crud: Record<string, AnyClass>;
	fetch: {
		baseURL: string;
	};
	screenPaths: Record<string, string>;
}
