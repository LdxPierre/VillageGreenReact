import "./Header.module.scss";

function Header() {
	return (
		<header>
			<nav>
				<a href="#" className="home">
					<span className="material-symbols-outlined">home</span>
				</a>
				<h1>VillageGreen Backoffice</h1>
				<a href="#">
					User
					<span className="material-symbols-outlined">account_circle</span>
				</a>
			</nav>
		</header>
	);
}

export default Header;
