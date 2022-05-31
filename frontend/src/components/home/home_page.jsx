import React from 'react';

class HomePage extends React.Component {

	render() {
		return (
			<div className='webpage'>
				<div className='two-col'>
					<div className='drink-feed'>
						I am the drink feed
						<br />
						I will feed you drinks
						<br />
						get it?
						#drinkfeed
					</div>
					<div>
						<div className='photo-box'>
							<img src="https://www.washingtonpost.com/resizer/bc1HepbzdO4UExB0ePr_YXPSVRc=/arc-anglerfish-washpost-prod-washpost/public/CL4WKYGACEI6ZNO7D65GDJTMOU.jpg"
							alt="dirnk of the day"
							/>
							<div>Drink of the day</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;