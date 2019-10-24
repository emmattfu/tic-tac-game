import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      count: 0
    };

    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

  }
  // Это заготовка для вывода массивом
  renderTable = () => {
    return (this.state.squares.map((element, index) => {
      return <div className="square" onClick={this.clickHandler} data={index} key={index}>{element}</div>
    }))
  }

  clickHandler = e => {
    let data = e.target.getAttribute('data');
    let currentSquares = this.state.squares;
 
    if (currentSquares[data] === null) {
      currentSquares[data] = this.state.count % 2 === 0 ? 'X' : 'O';
      this.setState({squares: currentSquares});
      this.setState({count: this.state.count + 1});
    } else {
      alert('Так нельзя!');
    }

    this.isWinner(currentSquares[data]);
    this.isDraw();
  }

  isWinner = (winnerTeam) => {
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i]
    }
  }

  isDraw() {
   if (this.state.squares.every(el => el !== null)) {
     alert('Ничья!');
     setTimeout(() => {
      this.setState({squares: Array(9).fill(null)})
     }, 3000);
   }
  }

  render() {
    
    return (
      <div className="tic-tac">
        <div className="square" onClick={this.clickHandler} data="0">{this.state.squares[0]}</div>
        <div className="square" onClick={this.clickHandler} data="1">{this.state.squares[1]}</div>
        <div className="square" onClick={this.clickHandler} data="2">{this.state.squares[2]}</div>
        <div className="square" onClick={this.clickHandler} data="3">{this.state.squares[3]}</div>
        <div className="square" onClick={this.clickHandler} data="4">{this.state.squares[4]}</div>
        <div className="square" onClick={this.clickHandler} data="5">{this.state.squares[5]}</div>
        <div className="square" onClick={this.clickHandler} data="6">{this.state.squares[6]}</div>
        <div className="square" onClick={this.clickHandler} data="7">{this.state.squares[7]}</div>
        <div className="square" onClick={this.clickHandler} data="8">{this.state.squares[8]}</div>
      </div>
    );
  }
 
}

export default App;
