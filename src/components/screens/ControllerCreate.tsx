import React from "react";
import { Screen } from "../../types/Screen";
import { Form } from "../Form";

export function ControllerCreate({ screen }: { screen: Screen }) {
	return <Form screen={screen} />;
}
