var board = {
  "width": 10, 
  "height": 10,
  "mines": 10
};

var Cell = React.createClass({
  render: function() {
    var key = this.props.cell + "_" + this.props.row;
    var display;
    var classes = "cell unvisited";

    if (this.props.board[key] !== undefined) {
      if (this.props.board[key] == -1) { // bomb
        display = "B";
        classes = "cell visited";
      } else if (this.props.board[key] == 0) {
        display = "";
        classes = "cell visited";
      } else {
        display = this.props.board[key];
        classes = "cell visited";
      }
    } else {
      display = "";
    }

    return (
      <td 
        className={classes}
        onClick={this.props.cellClick} data-value={this.props.cell + "," + this.props.row}
      >
      {display}
      </td>
    );
  }
});

var Row = React.createClass({
  render: function() { 
    return (
      <tr className={"row" + this.props.row}>
      {d3.range(0, this.props.cellsPerRow).map((col) => {
        return <Cell row={this.props.row} 
                     cell={col} 
                     cellClick={this.props.cellClick} 
                     board={this.props.board} 
                     display={this.props.display}
                     />;
      })}
      </tr>
    );
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {    // row,cell  0_1 -> row 0, cell 1
      board: {} // { 0_0: "", 0_1: "", 0_2: "" ... }
    }
  },

  componentDidMount: function() {
    $.get("https://nameless-temple-96802.herokuapp.com/api/init?width=" + board.width + "&height=" + board.height + "&mines=" + board.mines, (response) => {
      this.setState({ board: [] });
    });
  },

  cellClick: function(e) {
    var cell = e.target.getAttribute("data-value").split(",");
    var existingBoard = this.state.board;

    $.get("https://nameless-temple-96802.herokuapp.com/api/reveal?x=" + cell[0] + "&y=" + cell[1], (response) => { 
      var updatedBoard = response.data;
      updatedBoard = updatedBoard.reduce((prev, next) => {
        var key = next.x + "_" + next.y;  
        prev[key] = next.count;
        return prev;
      }, {}); 

      var totalBoard = Object.assign(existingBoard, updatedBoard);

      this.setState({ board: totalBoard });
    });
  },

  resetGame: function() { 
    $.get("https://nameless-temple-96802.herokuapp.com/api/init?width=" + board.width + "&height=" + board.height + "&mines=" + board.mines, (response) => {
      this.setState({ board: [] });
    });
  },

  render: function() {
    return (
      <div>
        <table className="board">
          {d3.range(0, this.props.rows).map((row) => {
            return <Row row={row} 
                        cellsPerRow={this.props.cellsPerRow} 
                        cellClick={this.cellClick} 
                        board={this.state.board} 
                    />
          })}
        </table>
        <Footer resetGame={this.resetGame}/>
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <div>
        <button onClick={this.props.resetGame}>Reset</button>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div id="header">
        Minesweeper
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    <Header />
    <Board rows={board.height} cellsPerRow={board.width} />
  </div>,
  document.getElementById("app")
);
