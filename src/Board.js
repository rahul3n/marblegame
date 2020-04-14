import React from 'react';
import Marble from './Marble';
import './Marble.css';
import './Board.css';

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentState : [
                [null,null,{row:1, column:3, state: Marble.NOT_EMPTY},{row:1, column:4, state: Marble.NOT_EMPTY},{row:1, column:5, state: Marble.NOT_EMPTY}, null, null],
                [null,null,{row:2, column:3, state: Marble.NOT_EMPTY},{row:2, column:4, state: Marble.NOT_EMPTY},{row:2, column:5, state: Marble.NOT_EMPTY}, null, null],
                [{row:3, column:1, state: Marble.NOT_EMPTY},{row:3, column:2, state: Marble.NOT_EMPTY},{row:3, column:3, state: Marble.NOT_EMPTY},{row:3, column:4, state: Marble.NOT_EMPTY},{row:3, column:5, state: Marble.NOT_EMPTY}, {row:3, column:6, state: Marble.NOT_EMPTY}, {row:3, column:7, state: Marble.NOT_EMPTY}],
                [{row:4, column:1, state: Marble.NOT_EMPTY},{row:4, column:2, state: Marble.NOT_EMPTY},{row:4, column:3, state: Marble.NOT_EMPTY},{row:4, column:4, state: Marble.EMPTY},{row:4, column:5, state: Marble.NOT_EMPTY}, {row:4, column:6, state: Marble.NOT_EMPTY}, {row:4, column:7, state: Marble.NOT_EMPTY}],
                [{row:5, column:1, state: Marble.NOT_EMPTY},{row:5, column:2, state: Marble.NOT_EMPTY},{row:5, column:3, state: Marble.NOT_EMPTY},{row:5, column:4, state: Marble.NOT_EMPTY},{row:5, column:5, state: Marble.NOT_EMPTY}, {row:5, column:6, state: Marble.NOT_EMPTY}, {row:5, column:7, state: Marble.NOT_EMPTY}],
                [null,null,{row:6, column:3, state: Marble.NOT_EMPTY},{row:6, column:4, state: Marble.NOT_EMPTY},{row:6, column:5, state: Marble.NOT_EMPTY}, null, null],
                [null,null,{row:7, column:3, state: Marble.NOT_EMPTY},{row:7, column:4, state: Marble.NOT_EMPTY},{row:7, column:5, state: Marble.NOT_EMPTY}, null, null]
            ],
            status : "Good Luck !!!",
            previousSelection : null,
            totalBalanceMarbles : 32

        };
        this.validSlots = [];
    };

    isMoveValid(marble){
        for(var i=0; i< this.validSlots.length; i++){
            if(this.validSlots[i].row === marble.row && 
                this.validSlots[i].column === marble.column){
                    return true;
                }
        }
        return false;
    };


    
    getMarble(board, row, column){
        if(row >= 0 && row <= 6 && column >= 0 && column <= 6){
            return board[row][column];
        } else {
            return null;
        }
    };

    
    handleMarbleClick(row, column, state){
        console.log("Row : "+row+ " Column : "+column+ " state : "+state);
        const board = this.state.currentState.slice();
        var selectedMarble = board[row-1][column-1];
        if (state === Marble.NOT_EMPTY && this.state.previousSelection === null) {
            
            
            
            selectedMarble.state = Marble.SELECTED;
            var top = this.getMarble(board,row-1-1,column-1);
            console.error("====> TOP : "+ top ? JSON.stringify(top) : "Not available");
            
            var topPlusOne = this.getMarble(board,row-1-1-1,column-1);
            console.error("====> TOP plus one : "+topPlusOne ? JSON.stringify(topPlusOne) : "Not available");

            var down = this.getMarble(board,row-1+1,column-1);
            console.error("====> DOWN : "+down ? JSON.stringify(down) : "Not available");

            var downPlusOne = this.getMarble(board, row-1+1+1, column-1);
            console.error("====> DOWN plus one : "+downPlusOne ? JSON.stringify(downPlusOne) : "Not available");
            
            var left = this.getMarble(board, row-1, column-1-1);
            console.error("====> LEFT : "+left ? JSON.stringify(left) : "Not available");

            var leftPlusOne = this.getMarble(board, row-1, column-1-1-1);
            console.error("====> LEFT plus one : "+leftPlusOne ? JSON.stringify(leftPlusOne) : "Not available");

            var right = this.getMarble(board, row-1, column-1+1);
            console.error("====> RIGHT : "+right ? JSON.stringify(right) : "Not available");

            var rightPlusOne = this.getMarble(board, row-1, column-1+1+1);
            console.error("====> RIGHT plus one : "+rightPlusOne ? JSON.stringify(rightPlusOne) : "Not available");

            if(top && top.state === Marble.NOT_EMPTY && topPlusOne && topPlusOne.state === Marble.EMPTY){
                this.validSlots.push(topPlusOne);
                topPlusOne.state = Marble.VALID_FOR_SELECTION;
            }

            if(down && down.state === Marble.NOT_EMPTY && downPlusOne && downPlusOne.state === Marble.EMPTY){
                this.validSlots.push(downPlusOne);
                downPlusOne.state = Marble.VALID_FOR_SELECTION;
            }

            if(left && left.state === Marble.NOT_EMPTY && leftPlusOne && leftPlusOne.state === Marble.EMPTY){
                this.validSlots.push(leftPlusOne);
                leftPlusOne.state = Marble.VALID_FOR_SELECTION;
            }

            if(right && right.state === Marble.NOT_EMPTY && rightPlusOne && rightPlusOne.state === Marble.EMPTY){
                this.validSlots.push(rightPlusOne);
                rightPlusOne.state = Marble.VALID_FOR_SELECTION;
            }

            if (this.validSlots.length > 0) {
                console.error(JSON.stringify(this.validSlots));
                // Set first initiated marble in previous selection to use in future
                this.setState({previousSelection : {row : row, column : column}});
            } else {
                this.setState({status : "You have selected wrong marble...!!! No possible moves for the marble you have selected."});
                selectedMarble.state = Marble.NOT_EMPTY;
            }
            



        } else if (state === Marble.VALID_FOR_SELECTION && this.state.previousSelection && this.validSlots.length>0){
            
            if(this.isMoveValid(selectedMarble)){
                selectedMarble.state = Marble.NOT_EMPTY;
                var previousLocrow = this.state.previousSelection.row;
                var previousLoccol = this.state.previousSelection.column;
                board[previousLocrow-1][previousLoccol-1].state = Marble.EMPTY;

                // Setting Middle slot empty if user selects second marble in same column
                if (selectedMarble.column === previousLoccol && previousLocrow > selectedMarble.row){
                    (board[previousLocrow-1-1][previousLoccol-1]).state = Marble.EMPTY;
                } else if (selectedMarble.column === previousLoccol && previousLocrow < selectedMarble.row){
                    (board[previousLocrow-1+1][previousLoccol-1]).state = Marble.EMPTY;
                } else if (selectedMarble.row === previousLocrow && previousLoccol > selectedMarble.column){
                    (board[previousLocrow-1][previousLoccol-1-1]).state = Marble.EMPTY;
                } else if (selectedMarble.row === previousLocrow && previousLoccol < selectedMarble.column) {
                    (board[previousLocrow-1][previousLoccol-1+1]).state = Marble.EMPTY;
                }

                // Reset Previous selection
                this.setState({previousSelection : null});
                this.validSlots = [];
            }

        } else {
            this.setState({status : "You have selected wrong marble...!!!"});
           
            var previousLocrow = this.state.previousSelection.row;
            var previousLoccol = this.state.previousSelection.column;
            board[previousLocrow-1][previousLoccol-1].state = Marble.NOT_EMPTY;

             // Reset Previous selection
             this.setState({previousSelection : null});
        }

        this.setState({currentState : board});

    };

    renderMarble(row, column, state, key){
        return <Marble rowPos={row} columnPos={column} state={state} key={key}
        onClick={()=> this.handleMarbleClick(row,column,state)}/>;
    };

   

    render(){
        var boardRow = [];
        for (var row = 0; row < this.state.currentState.length; row++){
            var rowArray = this.state.currentState[row];
            var boardColumn = [];
            for(var column = 0; column < rowArray.length; column++){
                var colData = rowArray[column];
                var key = row+"-"+column;
                boardColumn.push(colData ? this.renderMarble(colData.row,colData.column, colData.state, key) : <div key={key}></div>);

            }
            boardRow.push(<div key={row}>{boardColumn}</div>);
        }

        return(
            <div>
                {this.state.status}
                <div className="BoardBase type3">
                    {boardRow}
                </div>
            </div>
          
        );
    }



};

export default Board;