import React from 'react';
import './Marble.css';

class Marble extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            row : this.props.row,
            column : this.props.column
        };
    };

    getClassForState(state){
        switch(state){
            case Marble.EMPTY : return "marble-empty";
            case Marble.NOT_EMPTY : return "marble";
            case Marble.SELECTED : return "marble-selected";
            case Marble.VALID_FOR_SELECTION : return "marble-valid-for-selection";
            default : return "marble";
        }
    }



    render (){
        return(
            <button className={this.getClassForState(this.props.state)} onClick={() => this.props.onClick()} key={this.props.key}>
              {this.props.rowPos} - {this.props.columnPos}
            </button>
        );

    }




};

Marble.EMPTY = "EMPTY";
Marble.VALID_FOR_SELECTION = "VALID_FOR_SELECTION";
Marble.SELECTED = "SELECTED";
Marble.NOT_EMPTY = "NOT_EMPTY";

export default Marble;