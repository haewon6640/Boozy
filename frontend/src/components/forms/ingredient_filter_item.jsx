import React from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'

class FilterItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: true,
        }
    }
    toggleHeader(){
        if (this.state.open === true) {
            this.setState({ open: false })
        } else {
            this.setState({ open: true })
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
                    {this.state.open && <div className='subject-box'>
                        {this.props.array.map((el, i) => (<label key={i+this.props.subtitle} className="mycheckbox">
                            <input type="checkbox" className="check" onClick={()=>this.props.addToCart(el)} />
                            {el.name}
                        </label>))}
                    </div>}
                </div>
            </div>
        )
    }
}

export default FilterItem;