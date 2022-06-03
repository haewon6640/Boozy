import React from 'react';
import {combineAndSortArrByTime} from "../../reducers/selector";
import FeedIndex from './feed_index';
import {Link} from "react-router-dom";
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dotd: {},
            feed: []
        }
    }

    async componentDidMount() {
        await this.props.fetchReviews()
        // await this.props.fetchRecipes();
        await this.props.fetchDrinkOfTheDay()
        this.setState({
            dotd: Object.values(this.props.dotd)[0],
            feed: this.props.reviews.slice(0,20)
        });
    }

	render() {
        if (Object.values(this.state.dotd).length === 0) {
            return null;
        }
        // title, body
        const review = {}
		return (
            <div className="homepage">
                <div className='webpage '>
                    <div className='two-col feed-two-col'>
                        <div className="feed-container-top">                            
                            <FeedIndex feed={this.state.feed} />
                        </div>
                        <div className='dotd'>
                            <Link to={`/recipes/${this.state.dotd._id}`}>
                                <img className="dotd-img"src={this.state.dotd.imgUrl}
                                alt="drink of the day"/>
                            </Link>
                            <div className="dotd-title">
                                Drink Of the Day:
                                <Link to={`/recipes/${this.state.dotd._id}`}>
                                <span className="dotd-name">{this.state.dotd.name}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default HomePage;