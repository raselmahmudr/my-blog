import React from 'react';

import "./multi_input.scss"

class MultiInput extends React.Component {

    state = {
        values: [],
        value: ""
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            values: this.props.defaultValues
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.defaultValues !== this.props.defaultValues)
        this.setState({
            ...this.state,
            values: this.props.defaultValues
        })
    }

    onInputEnter = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            let updatedState = {...this.state}
            if(this.state.value) {
                let idx = updatedState.values.indexOf(this.state.value.trim())
                if (idx === -1) {
                    updatedState.values.push(this.state.value.trim())
                } else {
                    updatedState.values.splice(idx, 1)
                }
                this.props.onChange
                    && this.props.onChange({target: { values: updatedState.values, name: this.props.name}})
                this.setState({
                    ...updatedState,
                    value: ""
                })
            }
        }
    }

    deleteSelectedInput = (text)=> {
        let values = this.state.values.filter(v => v !== text)
        this.setState({
            ...this.state,
            values: values
        })
        this.props.onChange
            && this.props.onChange({target: { values: values, name: this.props.name}})
    }

    render() {
        return (
            <div className="multi-input">
                <div className="selected_input">
                    { this.state.values && this.state.values.map((v, i)=>(
                        <li key={i}>
                            {v}
                            <i
                                onClick={()=>this.deleteSelectedInput(v)}
                                className="fa fa-times delete_btn" />
                        </li>
                    )) }
                </div>
                <input
                    name={this.props.name}
                    className="input-elem"
                    type="text"
                    value={this.state.value}
                    onKeyPress={this.onInputEnter}
                    onChange={(e)=>this.setState({...this.state, value: e.target.value})}
                />
            </div>
        );
    }
};

export default MultiInput;