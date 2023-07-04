export interface CategoryInterface {
	"@id"?: string;
	id: number;
	name: string;
	url: string;
	parent: CategoryInterface | null;
	content: string;
}
