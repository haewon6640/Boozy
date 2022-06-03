import React from "react";
import FeedIndexItem from "./feed_index_item";
const FeedIndex = (props) => {
    return (
        <div className="feed-container-bottom">
            <div className="feed-title">Drinks Drank</div>
            <div className="feed-index-top">
                <div className="feed-filter"></div>
            </div>
            <div className="feed-index-container">
                <div className="feed-index">
                    {props.feed.map(item=>
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