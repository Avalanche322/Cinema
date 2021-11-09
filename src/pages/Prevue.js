import { Link } from "react-router-dom";
import { Container, Accordion } from "react-bootstrap";
import banner from "../img/banner.webp";
import tv from '../img/devices/tv.png';
import iphone from '../img/devices/iphone.png';
import imac from '../img/devices/imac.png';
import tvVideo from '../video/our-story/our-story-tv.gif';
import desktopVideo from '../video/our-story/our-story-desktop.gif';
import mobileVideo from '../video/our-story/our-story-mobile.gif';
import { useSelector } from "react-redux";

const Prevue = () => {
	document.title = `Cinema HD`;
	const sing_in = useSelector(state => state.user.settings?.sing_in);
	return (
		<>
			<section className="hero vh-100 d-flex align-items-center">
				<Container fluid="md">
					<div className="hero__body position-relative text-md-start text-center pt-5 pt-md-0">
						<h1 className="hero__title">The greatest stories,<br/> all in one place.</h1>
						<h2 className="hero__sub-title">Try 45 days for free</h2>
						{!sing_in && <div className="hero__block d-flex flex-column align-items-md-start align-items-center">
							<div className="d-md-flex my-3 hero__btns">
								<div className="d-flex flex-column me-5 w-100 mb-3 mb-md-0">
									<h3 className="hero__price mb-md-auto mb-3">€8,99 <span className="hero__sub-price white-80">| Month</span></h3>
									<Link to="/sing-up" className="hero__btn py-3 rounded-3 text-uppercase text-center">Sing up now</Link>
								</div>
								<div className="d-flex flex-column w-100">
									<h3 className="hero__price">€89,90 <span className="hero__sub-price white-80">| Year</span></h3>
									<span className="hero__sub-price white-80 mb-3">Save over 15%.* </span>
									<Link to="/sing-up" className="hero__btn py-3 rounded-3 text-uppercase text-center">Save on 12 months</Link>
								</div>
							</div>
							<span className="white-80 hero__sub-price">*Savings compared to 12 months (107,88 €) of the monthly subscription price.</span>
						</div>}
						{sing_in && 
							<div className="d-flex mt-3">
								<Link 
									to="/sing-up/platform" 
									className="hero__btn py-2 px-4 rounded-3 text-uppercase text-center"
								>Finish Sing Up
								</Link>
							</div>}
					</div>
				</Container>
				<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
					<img src={banner} className="h-100 w-100" alt="banner" />
					<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
				</div>
			</section>
			<section className="our-stories">
				<Container>
					<div className="container d-flex flex-column flex-md-row align-items-center text-md-start text-center py-5">
						<div className="mb-3 mb-md-0 w-100">
							<h2 className="our-stories__title">Watch on TV.</h2>
							<p className="our-stories__text">Watch on Smart TV, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, etc.</p>
						</div>
						<div className="position-relative">
							<div className="w-100 our-stories__img postion-relative">
								<img className="img-fluid" src={tv} alt="tv" loading="lazy" />
							</div>
							<div className="position-absolute our-stories__video-tv">
								<img className="img-fluid" src={tvVideo} alt="tv video" loading="lazy" />
							</div>
						</div>
					</div>
				</Container>
			</section>
			<section className="our-stories">
				<Container>
					<div className="container d-flex flex-column flex-md-row-reverse align-items-center text-md-start text-center py-5">
						<div className="mb-3 mb-md-0 w-100">
							<h2 className="our-stories__title">Favorite content.</h2>
							<p className="our-stories__text">Favorite your content and watch it will later to watch them anytime.</p>
						</div>
						<div className="w-100">				
							<div className="position-relative">
								<div className="our-stories__img our-stories__img-mobile me-md-auto ms-md-0 mx-auto">
									<img className="img-fluid" src={iphone} alt="iphone" />
								</div>
								<div className="position-absolute our-stories__video-mobile">
									<img className="img-fluid" src={mobileVideo} alt="mobile video" loading="lazy" />
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<section className="our-stories">
				<Container>
					<div className="container d-flex flex-column flex-md-row align-items-center text-md-start text-center py-5">
						<div className="w-100 mb-3 mb-md-0">
							<h2 className="our-stories__title">Watch ever where.</h2>
							<p className="our-stories__text">Watch movies and TV series without restrictions on your smartphone, tablet, laptop and TV at no extra charge.</p>
						</div>
						<div className="w-100">
							<div className="position-relative">
								<div className="w-100 our-stories__img postion-relative">
									<img className="img-fluid" src={imac} alt="imac" loading="lazy" />
								</div>
								<div className="position-absolute our-stories__video-desktop">
									<img className="img-fluid" src={desktopVideo} alt="desktop video" loading="lazy" />
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<section className="questions our-stories mt-3">
				<Container>
					<h2 className="our-stories__title text-center">Frequently Asked Questions</h2>
					<Accordion flush className="questions__list list-question mt-3">
						<Accordion.Item eventKey="0" className="list-question__item mb-2">
							<Accordion.Header>What is Cinema HD?</Accordion.Header>
							<Accordion.Body>
								Cinema HD is a video streaming service that allows you to watch a variety of award-winning TV series, movies, anime, documentaries and other content on thousands of devices connected to the Internet.

								You can watch as much and as much as you want without advertising, and all this at a single low monthly price. You will always find something new for yourself. In addition, even more TV series and movies are added every week!
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1" className="list-question__item mb-2">
							<Accordion.Header>How much does a Cinema HD subscription cost?</Accordion.Header>
							<Accordion.Body>
								Watch Cinema HD on your smartphone, tablet, Smart TV, laptop or streaming device for a fixed monthly price or year. Plans range from EUR 9.99 to EUR 11.99 per month, or 89.90 EUR for year. No surcharges or agreements.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2" className="list-question__item mb-2">
							<Accordion.Header>Where can I watch content?</Accordion.Header>
							<Accordion.Body>
								Look anywhere, anytime. Log in to your Cinema HD account to watch online content on cinema-hd.com from a personal computer or any Internet-connected device where you can download a Cinema HD application, such as a Smart TV, smartphone, tablet, or media player. streaming or game console.

								In addition, you can download your favorite TV shows in the application for iOS, Android or Windows 10. Download content and watch it on the go even without an Internet connection. Take Cinema HD with you
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3" className="list-question__item mb-2">
							<Accordion.Header>Where can I watch content?</Accordion.Header>
							<Accordion.Body>
								Look anywhere, anytime. Log in to your Cinema HD account to watch online content on cinema-hd.com from a personal computer or any Internet-connected device where you can download a Cinema HD application, such as a Smart TV, smartphone, tablet, or media player. streaming or game console.

								In addition, you can download your favorite TV shows in the application for iOS, Android or Windows 10. Download content and watch it on the go even without an Internet connection. Take Cinema HD with you
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="4" className="list-question__item mb-2">
							<Accordion.Header>How do I unsubscribe?</Accordion.Header>
							<Accordion.Body>
								Cinema HD provides flexible terms. No annoying agreements or commitments. You can unsubscribe in just two clicks. No cancellation fees. You can subscribe or unsubscribe at any time.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="5" className="list-question__item">
							<Accordion.Header>What can I see on Cinema HD?</Accordion.Header>
							<Accordion.Body>
								Cinema HD offers an extensive library of feature films, documentaries, TV series, anime, award-winning original content, and more. See as much as you want and whenever you want.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Container>
			</section>
		</>
	);
}
 
export default Prevue;