import { useState } from "react";
import CategoriesData from "./Categories.data";
import Menu from "./components/Menu";

const Index = (): JSX.Element => {
	const [categories, setCategories] = useState(CategoriesData);
	return (
		<>
			<Menu categories={categories}></Menu>
		</>
	);
};

export default Index;
