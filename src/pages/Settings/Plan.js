import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Table, Spinner, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { uploadSettings } from "../../redux/actions";
import { BiCheck } from 'react-icons/all';

const Plan = () => {
	const plans = [
		{id:0, title: "Plan 1", price: "€8,99", video: "Good", resolution: "720p"},
		{id:2, title: "Plan 2", price: "€9,99", video: "Better", resolution: "1080p"},
		{id:3, title: "Plan 3", price: "€11,99", video: "Best", resolution: "4K + HDR"},
		{id:4, title: "Plan 4", price: "€89,90", video: "Best", resolution: "4K + HDR"},
	]
	const dispatch = useDispatch();
	const plan = useSelector(state => state.user.settings.plan);
	const loading = useSelector(state => state.app.loading);
	const settings = useSelector(state => state.user.settings);
	const user = useSelector(state => state.user.user);
	const message = useSelector(state => state.app.message);
	const [selectPlan, setSelectPlan] = useState(plan ?? plans[plans.length - 1]);
	async function handleSubmit(e){
		e.preventDefault();
		dispatch(uploadSettings({ ...settings ,plan: selectPlan}, user))
	}
	return (
		<div className="col-xxl-7 col-md-8">
			<h3>Change Plan</h3>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
				<Form onSubmit={handleSubmit} className="mb-3">
					<div className='w-100 authentication__body settings-plan p-4 rounded-3 position-relative mt-3'>
						<div className='d-flex justify-content-center justify-content-lg-end settings-plan__btn settings-plan-btn'>
							<div className="d-flex settings-plan-btn__row">
								{plans.map(plan => (						
									<div 
										onClick={() => setSelectPlan(plan)}
										key={plan.id} 
										className="settings-plan-btn__item rounded-1 py-lg-4 py-3 text-center me-3">
										<input 
											className="settings-plan-btn__radio" 
											type="radio"
											name="plan"
											id={`plan_${plan.id}`}
											value={plan}
											checked={plan.id === selectPlan.id}
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
									<td className='settings-plan__cell-title'>Monthly price</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.price}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='settings-plan__cell-title'>Video quality</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.video}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='settings-plan__cell-title'>Resolution</td>
									{plans.map(plan => (
										<React.Fragment key={plan.id}>
										<td className={`text-center platform__cell text-nowrap ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.resolution}</td>
										</React.Fragment>
									))}
								</tr>
								<tr className="platform__row d-flex flex-wrap">
									<td className='settings-plan__cell-title'>Watch on your TV, computer, mobile phone and tablet</td>
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
					</div>
					<div className="mt-3">
						<Button 
							className="authentication__btn" 
							type="submit"
							disabled={loading}>
							Change Plan {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
						</Button>
					</div>
				</Form>
		</div>
	);
}
 
export default Plan;