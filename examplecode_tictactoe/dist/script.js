// https://babeljs.io/repl for better comparison (JSX <> polyfilled JS)
// and of course, the CodePens along with the tutorial (side-by-side check!)

// This is a simpler way to write (in cmp to `.. .. extends ..`)
// components that only cotain a `render` method and DON'T have
// their own state (in our case, it'll be managed by `Board`).
function Square(props) {
  // This 'square' component is now being "managed" by
  // (parent) component 'Board', i.e. props (val & event).
  return React.createElement(
    'button',
    {
      // JSX: className='square'
      className: 'square',

      // JSX: onClick={() => alert('clicked!')}
      // NOTE: do not use `function() {}`, use arrow func!
      onClick:
        // The `props` was passed in from `Board`, so the
        // event/behavior was actually done/implemented by
        // the parent component 'Board' (aka. `handleClick`)
        props.onClick,
    },
    // Similar to 'this.props.onClick', the `value` serves as
    // a placeholder for parent 'Board' to pass into :)
    props.value
  );
}

class Board extends React.Component {
  // Now 'Board' handles the state instead of 'Square's themselves.
  constructor(props) {
    super(props);
    this.state = {
      // initialize with 9 blank squares
      squares: Array(9).fill(null),
      // set initial state to be 'X'
      xIsNext: true,
    };
  }

  handleClick(i) {
    // a copy of 'squares' || intial 'squares' with 9 'null's
    const squares = this.state.squares.slice();

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      // update modified `squares` (intial => filled with 'X')
      squares: squares,
      // flip true|false to determine which player goes next
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return React.createElement(Square, {
      value: this.state.squares[i],
      onClick: () => this.handleClick(i),
    });
  }

  render() {
    const status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return React.createElement(
      'div',
      null,
      React.createElement('div', { className: 'status' }, status),
      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(0),
        this.renderSquare(1),
        this.renderSquare(2)
      ),

      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(3),
        this.renderSquare(4),
        this.renderSquare(5)
      ),

      React.createElement(
        'div',
        { className: 'board-row' },
        this.renderSquare(6),
        this.renderSquare(7),
        this.renderSquare(8)
      )
    );
  }
}

class Game extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'game' },
      React.createElement(
        'div',
        { className: 'game-board' },
        React.createElement(Board, null)
      ),

      React.createElement(
        'div',
        { className: 'game-info' },
        React.createElement('div', null),
        React.createElement('ol', null)
      )
    );
  }
}

// ========================================

ReactDOM.render(
  React.createElement(Game, null),
  document.getElementById('root')
);

function calculateWinner(squares) {
  const all_possible_win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < all_possible_win_combos.length; i++) {
    const [a, b, c] = all_possible_win_combos[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
