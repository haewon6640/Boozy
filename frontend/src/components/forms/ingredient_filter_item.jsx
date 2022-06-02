import React from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
class FilterItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            checked: new Array(this.props.array.length)
        }
    }
    toggleHeader(){
        if (this.state.open === true) {
            this.setState({ open: false })
        } else {
            this.setState({ open: true })
        }
    }

    checkBox(el, i){
        return e => {
            let arr = this.state.checked
            arr[i] = e.target.checked
            this.setState({checked: arr}, () => this.props.addToCart(el))
        }
    }


    render(){
        return (
            <div>
                <div className='ingredients-list-subtitle'>
                    <div className='subtitle-box' onClick={()=>this.toggleHeader()}>
                        <div className='category-title'>{this.props.subtitle}</div>
                        {this.state.open ? <div className='filter-ico'><IoIosArrowDown/></div> : <div className='filter-ico'><IoIosArrowBack/></div>}
                    </div>
                    {this.state.open && <div className={`subject-box ${this.state.open ? "open" : ""}`}>
                        {this.props.array.map((el, i) => (
                            <div key={el._id} className="mycheckbox">
                                <input name="ing-box" type="checkbox" className="check" checked={this.state.checked[i]} onChange={this.checkBox(el, i)} />
                                <label htmlFor="ing-box">{el.name}</label>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        )
    }
}

export default FilterItem;