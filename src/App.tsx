import Aside from "./layouts/Aside";
import Body from "./layouts/Body";
import Header from "./layouts/Header";

function App() {
	return (
		<div className="d-flex flex-column vh-100">
			<Header></Header>
			<Body>
				<Aside></Aside>
			</Body>
		</div>
	);
}

export default App;
