export default interface CategoryInterface {
  id: number;
  name: string;
  url: string;
  parent: CategoryInterface | null;
  content: string;
}
