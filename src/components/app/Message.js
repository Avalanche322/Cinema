import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hideError } from "../../redux/actions";

const Message = ({text}) => {
	const dispatch = useDispatch();
	function hideMessage(){
		dispatch(hideError());
	}
	return (
		<Modal show={!!text} onHide={hideMessage}>
			<Modal.Header>
				<Modal.Title>Error!!!</Modal.Title>
			</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Button className='modal__btn border-0' onClick={hideMessage}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
 
export default memo(Message);