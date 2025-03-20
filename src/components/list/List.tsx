import React from "react";
import { CellOptions } from "../../decorators/Cell";
import { Link } from "react-router";
import { Screen } from "../../types/Screen";

interface ListProps<T> {
	data: T[];
	cells: CellOptions<T>[];
	screen: Screen;
}

export function List<T>({ data, cells, screen }: ListProps<T>) {
	if (!data || data.length === 0) {
		return <div>No items available</div>;
	}

	return (
		<div className="list-wrapper">
			<div className="header">List</div>
			<table className="list-table">
				<thead>
					<tr>
						{cells.map((cellOptions) => (
							<th key={cellOptions.name}>{cellOptions.title ?? cellOptions.name}</th>
						))}
						<th />
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							{cells.map((cellOptions) => {
								// @ts-ignore
								const value = item[cellOptions.name];
								let formattedValue = value ?? "-"; // Default value if the field is undefined or null

								switch (cellOptions.type) {
									case "date":
										if (value) {
											const date = new Date(value);
											formattedValue = `${date.getDate().toString().padStart(2, "0")}/${(
												date.getMonth() + 1
											)
												.toString()
												.padStart(
													2,
													"0"
												)}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date
												.getMinutes()
												.toString()
												.padStart(2, "0")}`;
										}
										break;

									case "number":
									case "string":
									default:
										formattedValue = value ? value.toString() : (cellOptions?.placeHolder ?? "-"); // Handles string type or default fallback
										break;
								}
								let render = formattedValue;
								if (cellOptions.linkTo) {
									render = <Link to={cellOptions.linkTo(item)}>{formattedValue}</Link>;
								}
								return <td key={cellOptions.name}>{render}</td>;
							})}
							<td>
								{/*@ts-ignore*/}
								<Link to={"edit/" + (item?.id ?? "-")}>Edit</Link>
								{/*@ts-ignore*/}
								<Link to={"details/" + (item?.id ?? "-")}>Details</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
