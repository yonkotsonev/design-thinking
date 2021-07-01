export default function StickyItem(props) {
	const openModal = () => {
		var sticky = {...props.value};
		sticky.id = props.id;

		props.setSelected(sticky);
		props.setShowModal(true);
	};

	return (
		<div 
			id={props.id} 
			onClick={openModal} 
			className="bg-warning sticky m-1 p-1 border border-2 border-dark {props.value.color}"
		>{props.value.text}</div>
	)
}