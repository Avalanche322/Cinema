import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { BiChevronLeft } from "react-icons/all";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import fullLogo from '../../img/full-logo.png';
import banner from "../../img/banner.webp";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { uploadSettings } from "../../redux/actions"
import { useSelector } from "react-redux";

const Payment = ({plan, user,settings}) => {
	const [number, setNumber] = useState();
	const [cvv, setCvv] = useState();
	const [month, setMonth] = useState();
	const [name, setName] = useState();
	const dispatch = useDispatch();
	const history = useHistory();
	const loading = useSelector(state => state.app.loading);
	const error = useSelector(state => state.app.error);
	useEffect(() => {
		// title for page
		document.title = "Choose Plan | Cinema HD"
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		let numberWithoutSpace = number.replace(/ /gi, '');
		dispatch(uploadSettings({ ...settings ,card: {number:numberWithoutSpace,cvv,month,name}}, user, '/'))
	}
	const back = e => {
		e.stopPropagation();
		history.push('/sing-up/platform');
	};
	function handlerNumber(e){
		setNumber(e.target.value?.replace(/ /gi, '').match(/.{1,4}/g)?.join(' '));
	}
	function handlerMonth(e){
		setMonth(e.target.value.replace(/[/]/gi, '').match(/.{1,2}/g)?.join('/'));
	}
	function handlerCvv(e){
		setCvv(e.target.value);
	}
	function handlerName(e){
		setName(e.target.value);
	}
	return (
		<div className="authentication payment min-vh-100 d-flex justify-content-center align-items-center">
			<div className="payment__body authentication__body p-4 rounded-3 position-relative">
				<div className="mb-4">
						<div className="d-flex">
							<h2 className="authentication__title"><img className="authentication__logo pb-1" src={fullLogo} alt="logo" /></h2>
						</div>
					<span>STEP 3 OF 3</span>
					<h3>Set up your payment</h3>
					{error && <Alert className="p-2 mt-2" variant="warning">{error}</Alert>}
				</div>
				<Form onSubmit={handleSubmit} className="mb-3">
					<div className="text-center mt-3">
						<div className="payment__card d-flex flex-column justify-content-between rounded-3 p-3 mx-auto">
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
										onChange={handlerCvv}
										disabled={loading}
										required />
								</div>
								<div className="d-flex flex-column">
									<input 
										className="payment__data mt-3" 
										type="text" 
										placeholder="Name Surname" 
										id="card-holder"
										onChange={handlerName}
										disabled={loading}
										required />
								</div>
							</div>
						</div>
						<div className="payment__change-paln d-flex justify-content-between align-items-center p-2 rounded-3 mt-3 mx-auto">
							<div className="d-flex flex-column text-start">
								<span>{plan.price}/month</span>
								<span className="white-50">{plan.title}</span>
							</div>
							<Link to="/sing-up/platform" className={`${loading ? 'disabled-link' : ''}`}>Change</Link>
						</div>
						<Button 
							className="authentication__btn w-50 mt-3" 
							type="submit"
							disabled={loading}>
							Start Membership  {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
						</Button>
					</div>
				</Form>
				<BiChevronLeft 
					onClick={back} 
					className={`back position-absolute top-50 rounded-circle ${loading ? 'disabled-link' : ''}`}
				/>
			</div>
			<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
				<img src={banner} className="h-100 w-100" alt="banner" />
				<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		plan: state.user.settings.plan,
		user: state.user.user,
		settings: state.user.settings,
	}
}
 
export default connect(mapStateToProps,null) (Payment);