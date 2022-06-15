import React from "react";
import FeedIndexItem from "./feed_index_item";
import {sortByNew} from "../../reducers/selector";
const FeedIndex = (props) => {
    let feed = sortByNew(props.feed);
    return (
        <div className="feed-container-bottom">
            <div className="feed-title web">Drinks Drank</div>
            <div className="feed-index-top">
            <div className="feed-title phone">Drinks Drank</div>
                <div className="feed-filter"></div>
            </div>
            <div className="feed-index-container">
                <div className="feed-index">
                    {feed.map(item=>
                        <div>
                            <FeedIndexItem item={item}/>
                            <div className="feed-item-border-bottom"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FeedIndex;