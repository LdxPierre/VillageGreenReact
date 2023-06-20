export default interface CategoryInterface {
	id: string;
	name: string;
	url: string;
	parent_id: string | null;
	children: [] | string[];
}
