import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { BiChevronLeft, BiCheck } from "react-icons/all";
import { Button, Form, Alert, Table, Spinner } from "react-bootstrap";
import fullLogo from '../../img/full-logo.png';
import banner from "../../img/banner.webp";
import { useDispatch, useSelector } from "react-redux";
import { changeSettings } from "../../redux/actions";

const Platform = () => {
	const plans = [
		{id:0, title: "Plan 1", price: "€8,99", video: "Good", resolution: "720p"},
		{id:2, title: "Plan 2", price: "€9,99", video: "Better", resolution: "1080p"},
		{id:3, title: "Plan 3", price: "€11,99", video: "Best", resolution: "4K + HDR"},
		{id:4, title: "Plan 4", price: "€89,90", video: "Best", resolution: "4K + HDR"},
	]
	const dispatch = useDispatch();
	const plan = useSelector(state => state.user.settings?.plan);
	const loading = useSelector(state => state.app.loading);
	const error = useSelector(state => state.app.error);
	const [selectPlan, setSelectPlan] = useState(plan ?? plans[plans.length - 2]);
	const history = useHistory();
	useEffect(() => {
		// title for page
		document.title = "Choose Plan | Cinema HD"
	}, []);
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
		<>
			<div className="authentication platform min-vh-100 d-flex justify-content-center align-items-center">
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
					<Form onSubmit={handleSubmit} className="mb-3">
						<div className="d-flex justify-content-center justify-content-md-end">
						{plans.map(plan => (						
							<div key={plan.id}>
								<input 
									className="platform__plan-radio" 
									type="radio"
									name="plan"
									id={`plan_${plan.id}`}
									value={plan}
									onChange={() => setSelectPlan(plan)}
									checked={plan.id === selectPlan.id}
									disabled={loading}
									hidden/>
								<label 
									className="platform__plan-item ms-3 rounded-1 p-4" 
									htmlFor={`plan_${plan.id}`}			
								>{plan.title}</label>
							</div>
						))}
						</div>
						<Table className="platform__plan">
							<tbody>
								<tr className="platform__row">
									<td>Monthly price</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.price}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row">
									<td>Video quality</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.video}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row">
									<td>Resolution</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell text-nowrap ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.resolution}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row">
									<td>Watch on your TV, computer, mobile phone and tablet</td>
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
						className={`back position-absolute top-50 rounded-circle ${loading ? 'disabled-link' : ''}`}
					/>
				</div>
				<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
					<img src={banner} className="h-100 w-100" alt="banner" />
					<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
				</div>
			</div>
		</>
	);
}
 
export default Platform;