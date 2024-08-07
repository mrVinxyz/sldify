import "./index.css";

import { render } from "solid-js/web";
import {Route, Router, RouteSectionProps} from "@solidjs/router";
import Dropdown from "./dropdown/dropdown";
import {JSX} from "solid-js";

render(() => <Routing />, document.body);

function Routing() {
	return (
		<Router root={Layout}>
			<Route path="/dropdown" component={Dropdown} />
		</Router>
	);
}

function Layout(props: RouteSectionProps): JSX.Element {
	return (
		<div class={'p-4 bg-gray-50 w-screen h-screen'}>{props.children}</div>
	)
}