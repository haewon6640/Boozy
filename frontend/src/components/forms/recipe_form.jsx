import React from "react";

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => (
            this.setState({
                [field]: e.target.value
            })
        )
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
    }

    render() {
        return (
            <div>
                {this.props.formType}
                <form onSubmit={this.handleSubmit}>
                    <label>Recipe Name
                        <input onChange={this.update("name")} type="text" value={this.state.name} />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}