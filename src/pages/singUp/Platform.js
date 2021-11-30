import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { BiChevronLeft, BiCheck } from "react-icons/all";
import { Button, Form, Alert, Table, Spinner, Container } from "react-bootstrap";
import fullLogo from '../../img/full-logo.png';
import banner from "../../img/banner.webp";
import { useDispatch, useSelector } from "react-redux";
import { changeSettings, uploadPlans } from "../../redux/actions";

const Platform = () => {
	const dispatch = useDispatch();
	const currentPlan = useSelector(state => state.user.settings?.plan);
	const plans = useSelector(state => state.user.plans);
	const loading = useSelector(state => state.app.loading);
	const error = useSelector(state => state.app.error);
	const [selectPlan, setSelectPlan] = useState(currentPlan ?? plans[plans.length - 2]);
	const history = useHistory();
	useEffect(() => {
		// title for page
		document.title = "Choose Plan | Cinema HD"
	}, []);
	useEffect(() => {
		dispatch(uploadPlans());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	async function handleSubmit(e){
		e.preventDefault();
		dispatch(changeSettings({plan: selectPlan}));
		history.push('/sing-up/payment');
	}
	const back = e => {
		e.stopPropagation();
		history.goBack();
	};
	return (
		<Container fluid='md'>
			{plans && <div className="authentication platform min-vh-100 d-flex justify-content-center align-items-center">
				<div className="platform__body authentication__body p-4 rounded-3 position-relative">
					<div className="mb-4">
							<div className="d-flex">
								<h2 className="authentication__title"><img className="authentication__logo pb-1" src={fullLogo} alt="logo" /></h2>
							</div>
						<span>STEP 2 OF 3</span>
						{error && <Alert className="p-2 mt-2" variant="warning">{error}</Alert>}
						<h3>Choose the plan that’s right for you</h3>
						<ul>
							<li className="d-flex align-items-center">
								<BiCheck className="me-1 fs-3 platform__check"/>
								<span>Watch all you want. Ad-free.</span>
							</li>
							<li className="d-flex align-items-center">
								<BiCheck className="me-1 fs-3 platform__check"/>
								<span>Recommendations just for you.</span>
							</li>
							<li className="d-flex align-items-center">
								<BiCheck className="me-1 fs-3 platform__check"/>
								<span>Change or cancel your plan anytime.</span>
							</li>
						</ul>
					</div>
					<Form onSubmit={handleSubmit} className="mb-3 d-flex flex-column platform__btn btn-platform">
						<div className='d-flex justify-content-center justify-content-md-end'>
							<div className="d-flex btn-platform__row">
								{plans.map(plan => (						
									<div 
										onClick={() => setSelectPlan(plan)}
										key={plan.id} 
										className="btn-platform__item rounded-1 py-lg-4 py-3 text-center me-3">
										<input 
											className="btn-platform__radio" 
											type="radio"
											name="plan"
											id={`plan_${plan.id}`}
											value={plan}
											defaultChecked={plan.id === selectPlan.id}
											disabled={loading}
											hidden/>
										<label 
											
											htmlFor={`plan_${plan.id}`}			
										>{plan.title}</label>
									</div>
								))}
							</div>
						</div>
						<Table className="platform__plan">
							<tbody className='d-flex flex-column'>
								<tr className="platform__row d-flex flex-wrap">
									<td className='platform__cell-title'>Monthly price</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>€{plan.price}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='platform__cell-title'>Video quality</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.video}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='platform__cell-title'>Resolution</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.resolution}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='platform__cell-title'>Watch on your TV, computer, mobile phone and tablet</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>
											<BiCheck className="me-1 fs-3"/>
										</td>
										</React.Fragment>
									))}
								</tr>
							</tbody>
						</Table>
						<p className="white-60 mb-2">
							<small>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions.</small>
						</p>
						<p className="white-60">
							<small>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.</small>
						</p>
						<div className="text-center mt-3">
							<Button 
								className="authentication__btn w-50" 
								type="submit"
								disabled={loading}>
								Next {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
							</Button>
						</div>
					</Form>
					<BiChevronLeft 
						onClick={back} 
						className={`authentication__back position-absolute top-50 rounded-circle ${loading ? 'disabled-link' : ''}`}
					/>
				</div>
				<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
					<img src={banner} className="h-100 w-100" alt="banner" />
					<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
				</div>
			</div>}
		</Container>
	);
}
 
export default Platform;