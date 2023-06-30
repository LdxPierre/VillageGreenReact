import { HydraCollectionInterface } from "../types";

const API_URL = "http://localhost:8000/api/products";

export const getProducts = async (queryParams?: URLSearchParams): Promise<HydraCollectionInterface> => {
  const res: Response = await fetch(`${API_URL}${queryParams ? `?${queryParams}` : ""}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Error on getProducts");
  }
};

export const newProduct = async (body: {}) => {
  const values = JSON.stringify(body);
  const res: Response = await fetch(`${API_URL}`, {
    method: "POST",
    body: values,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error on new product");
  }
};

export const editProduct = async (body: { id: number }) => {
  const values = JSON.stringify(body);
  const res: Response = await fetch(`${API_URL}${`/${body.id}`}`, {
    method: "PATCH",
    body: values,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Error on edit product");
  }
};
