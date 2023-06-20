import CategoryInterface from "../../types/CategoryInterface";

const CategoriesData = (): CategoryInterface[] => {
	return [
		{
			id: "1",
			parent_id: null,
			name: "Catégori #1",
			url: "category-one",
			children: ["4"],
		},
		{
			id: "2",
			parent_id: null,
			name: "Catégori #2",
			url: "category-two",
			children: [],
		},
		{
			id: "3",
			parent_id: null,
			name: "Catégori #3",
			url: "category-three",
			children: [],
		},
		{
			id: "4",
			parent_id: "1",
			name: "Catégorie #4",
			url: "category-four",
			children: [],
		},
	];
};

export default CategoriesData;
