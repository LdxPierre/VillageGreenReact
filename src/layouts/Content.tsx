import Index from "../pages/order/Index";

interface Props {
	setTitle: (title: string) => void;
}

const Content = ({ setTitle }: Props): JSX.Element => {
	return (
		<>
			<Index setTitle={setTitle}></Index>
		</>
	);
};

export default Content;
