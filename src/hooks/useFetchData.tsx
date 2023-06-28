import { useEffect, useState } from "react";
import { HydraCollectionInterface } from "../types";

interface Props {
	pathname: string;
	params?: string;
	headers?: {};
}

export const useFetchData = ({ pathname, params, headers }: Props) => {
	const [data, setData] = useState<HydraCollectionInterface>();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const urlApi = new URL("http://localhost:8000/api/");

	useEffect(() => {
		let ignore = false;
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(`${urlApi}${pathname}?${params ?? ""}`, headers);
				if (res.ok) {
					const body: HydraCollectionInterface = await res.json();
					setData(body);
				} else {
					setError("Erreur");
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
		return () => {
			ignore = true;
		};
	}, [pathname, params, headers]);

	return { data, error, loading };
};
