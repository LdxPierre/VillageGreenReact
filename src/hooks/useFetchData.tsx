import { useEffect, useState } from "react";
import HydraCollectionInterface from "../types/HydraCollectionInterface";

interface Props {
	url: string;
	headers?: {};
}

const useFetchData = ({ url, headers }: Props) => {
	const [data, setData] = useState<HydraCollectionInterface>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let ignore = false;
		const fetchData = async () => {
			try {
				const res = await fetch(url, headers);
				if (res.ok) {
					const body = await res.json();
					setData(body);
				} else {
					setError("Erreur");
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
		return () => {
			ignore = true;
		};
	}, []);

	return { data, error };
};

export default useFetchData;
