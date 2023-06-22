import CategoryInterface from "../../types/CategoryInterface";

const CategoriesData: CategoryInterface[] = [
	{
		id: "1",
		parent_id: null,
		name: "Catégorie #1",
		url: "category-one",
		children: ["4"],
	},
	{
		id: "2",
		parent_id: null,
		name: "Catégorie #2",
		url: "category-two",
		children: [],
	},
	{
		id: "3",
		parent_id: null,
		name: "Catégorie #3",
		url: "category-three",
		children: [],
	},
	{
		id: "4",
		parent_id: "1",
		name: "Catégorie #4",
		url: "category-four",
		children: ["5"],
	},
	{
		id: "5",
		parent_id: "4",
		name: "Catégorie #5",
		url: "category-four",
		children: ["6"],
	},
	{
		id: "6",
		parent_id: "5",
		name: "Catégorie #6",
		url: "category-four",
		children: ["7"],
	},
	{
		id: "7",
		parent_id: "6",
		name: "Catégorie #7",
		url: "category-four",
		children: [],
	},
];
export default CategoriesData;
