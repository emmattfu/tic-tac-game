import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      result: '',
      crossW: 0,
      zerosW: 0,
      gameOn: true,
      firstPlayer: ''
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
    if (this.state.gameOn === true) {
      let data = e.target.getAttribute('data');
      let currentSquares = this.state.squares;
   
      if (currentSquares[data] === null) {
        if (this.state.firstPlayer === 'O' ) {
          currentSquares[data] = this.state.count % 2 === 0 ? 'O' : 'X';
          this.setState({squares: currentSquares});
          this.setState({count: this.state.count + 1});
        } else {
          currentSquares[data] = this.state.count % 2 === 0 ? 'X' : 'O';
        this.setState({squares: currentSquares});
        this.setState({count: this.state.count + 1});
        }
        
      } else {
        alert('Так нельзя!');
      }
  
      this.isWinner(currentSquares[data]);
      this.isDraw();
    }
    
  }

  isWinner = (winnerTeam) => {
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      if (this.state.squares[line[0]] === winnerTeam 
        && this.state.squares[line[1]] === winnerTeam
        && this.state.squares[line[2]] === winnerTeam
        && this.state.count < 8) {
        this.setState({result: winnerTeam})
        winnerTeam === 'X' ? this.setState({crossW: this.state.crossW + 1}) : this.setState({zerosW: this.state.zerosW + 1})
        this.setState({gameOn: false})
        this.nextRound();
      }
    }
  }


  nextRound = () => {
    setTimeout(() => {
      this.setState({squares: Array(9).fill(null)});
      this.setState({count: 0});
      this.setState({result: ''});
      this.setState({gameOn: true})
     }, 5000);
  }

  isDraw() {
   if (this.state.squares.every(el => el !== null)) {
     this.setState({result: 'Draw'});
     this.nextRound();
   }
  }

  restart = e => {
    this.setState({squares: Array(9).fill(null)});
    this.setState({count: 0});
    this.setState({result: ''});
    
  }

  whoFirst = e => {
    this.restart();
    let data = e.target.getAttribute('data');
    data === 'O' ? this.setState({firstPlayer: 'O'}) : this.setState({firstPlayer: 'X'})
    console.log(this.state.firstPlayer)
  }

  render() {
    let result = '';
    this.state.result === '' ? result = '' : result = <div className="result">{this.state.result} won!</div>
    if (this.state.result === 'Draw') result = <div className="result">{this.state.result}!</div>
    return (
      <div className="App">
         <div className="score">
          <p>{this.state.crossW}</p>
          <p>{this.state.zerosW}</p>
        </div>
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
        <button className="X-btn btn" onClick={this.whoFirst} data="X">X first</button>
        <button className="O-btn btn" onClick={this.whoFirst} data="O">O first</button>
        <button className="restart-btn btn" onClick={this.restart}>Restart game</button>
        {result}
      </div>
    );
  }
 
}

export default App;
