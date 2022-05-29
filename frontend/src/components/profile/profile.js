import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.currentUser.id}
            </div>
        )
    }
}

export default Profile;
