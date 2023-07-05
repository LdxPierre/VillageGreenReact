import { useContext } from "react";
import { UserContext } from "../../context";

const Profile = (): JSX.Element => {
	const user = useContext(UserContext);
	return (
		<>
			<h3>Bonjour {user?.firstname}</h3>

			<ul>
				<li>Prénom: {user?.firstname ?? "Non renseigné"}</li>
				<li>Nom: {user?.lastname ?? "Non renseigné"}</li>
				<li>E-mail: {user?.email}</li>
				<li>Téléphone: {user?.phone ?? "Non renseigné"}</li>
			</ul>
		</>
	);
};

export default Profile;
