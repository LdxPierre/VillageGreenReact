import PaginationInterface from "./PaginationInterface";

export default interface HydraCollectionInterface {
  "hydra:totalItems": number;
  "hydra:member": any[];
  "hydra:view": PaginationInterface | null;
}
