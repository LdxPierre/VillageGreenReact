type Props = {
	children: JSX.Element;
};

const Body = ({ children }: Props): JSX.Element => {
	return <main className="">{children}</main>;
};

export default Body;
