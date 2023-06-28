import { PaginationInterface } from ".";

export interface HydraCollectionInterface {
	"hydra:totalItems": number;
	"hydra:member": any[];
	"hydra:view": PaginationInterface | null;
}
