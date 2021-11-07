import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Form, Alert } from 'react-bootstrap'
import { uploadSettings } from "../../redux/actions";

const Payment = () => {
	const [number, setNumber] = useState();
	const [cvv, setCvv] = useState();
	const [month, setMonth] = useState();
	const [name, setName] = useState();
	const dispatch = useDispatch();
	const loading = useSelector(state => state.app.loading);
	const settings = useSelector(state => state.user.settings);
	const user = useSelector(state => state.user.user);
	const message = useSelector(state => state.app.message);
	async function handleSubmit(e){
		e.preventDefault();
		let numberWithoutSpace = number.replace(/ /gi, '');
		dispatch(uploadSettings({ ...settings ,card: {number:numberWithoutSpace,cvv,month,name}}, user));
		setName('');
		setMonth('');
		setCvv('');
	}
	function handlerNumber(e){
		setNumber(e.target.value?.replace(/ /gi, '').match(/.{1,4}/g)?.join(' '));
	}
	function handlerMonth(e){
		setMonth(e.target.value.replace(/[/]/gi, '').match(/.{1,2}/g)?.join('/'));
	}
	return (
		<div className="col-xxl-9 col-md-8">
			<h3>Change Payment</h3>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
			<Form onSubmit={handleSubmit} className="mt-3">
				<div className="payment__card d-flex flex-column justify-content-between rounded-3 p-3">
					<h2 className="payment__card-info text-start">Enter Card Info Below</h2>
					<div className="d-flex flex-column">
						<input 
							className="payment__data payment__number w-100" 
							type="text" 
							placeholder="1111 1111 1111 1111" 
							id="numbar-card"
							maxLength="19"
							onChange={handlerNumber}
							value={number ?? ''}
							disabled={loading}
							required />
						<div className="d-flex mt-2 justify-content-end">
							<input 
								className="payment__data payment__month me-3" 
								type="text" 
								placeholder="MM/YY" 
								id="month"
								maxLength="5"
								onChange={handlerMonth}
								value={month ?? ''}
								disabled={loading}
								required />
							<input 
								className="payment__data payment__ccv" 
								type="password" 
								placeholder="CVV" 
								id="cvv"
								maxLength="3"
								onChange={(e) => setCvv(e.target.value)}
								disabled={loading}
								required />
						</div>
						<div className="d-flex flex-column">
							<input 
								className="payment__data mt-3" 
								type="text" 
								placeholder="Name Surname" 
								id="card-holder"
								onChange={(e) => setName(e.target.value)}
								disabled={loading}
								required />
						</div>
					</div>
				</div>
				<Button 
					className="authentication__btn mt-3" 
					type="submit"
					disabled={loading || !cvv || !name || !number}>
					Change Payment  {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
				</Button>
			</Form>
		</div>
	);
}
 
export default Payment;