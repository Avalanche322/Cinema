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
		<div className="col-xxl-9 col-md-8">
			<h3>Change Plan</h3>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
				<Form onSubmit={handleSubmit} className="mb-3">
					<div className="platform__body authentication__body p-4 rounded-3 position-relative mt-3">
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
										<td className={`text-center platform__cell ${selectPlan.id === plan.id ? 'platform__active' : ''}`}>{plan.price}</td>
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
					</div>
					<div className="mt-3">
						<Button 
							className="authentication__btn" 
							type="submit"
							disabled={loading}>
							Submit {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
						</Button>
					</div>
				</Form>
		</div>
	);
}
 
export default Plan;