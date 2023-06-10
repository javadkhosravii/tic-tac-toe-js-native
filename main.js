// players
const X = 'x'
const O = 'o'
const PLAYER = {
    X: 'x',
    O: 'o',
}

// states
const STATE = {
    START: 'start',
    SELECT: 'select',
    PLAY: 'play',
}

// sections
const START_SECTION = document.getElementById('start-section')
const SELECT_SECTION = document.getElementById('select-section')
const PLAY_SECTION = document.getElementById('play-section')

// buttons
const START_BTN = document.getElementById('start-btn')
const SELECT_BTN = document.getElementById('select-btn')
const RESET_BTN = document.getElementById('reset-btn')

// radio input
const RADIO_BTNS = document.querySelectorAll('input[type="radio"]')
RADIO_BTNS.forEach(radio_btn => {
    radio_btn.onchange = function() {
        console.log(this.value);
        player = this.value
    }
})

// game element
const BOARD_LABEL = PLAY_SECTION.querySelector('.label')
const BOARD_LABEL_TEXT = BOARD_LABEL.querySelector('span')
const BOARD_LABEL_X_PLAYER = BOARD_LABEL.querySelector('.player-x')
const BOARD_LABEL_O_PLAYER = BOARD_LABEL.querySelector('.player-o')
const BOARD = PLAY_SECTION.querySelector('#board')

// state manager
let state = STATE.START
let player = PLAYER.X
let finished = false
let moves = {}
let winner_moves = null

// winning conditions
const WC = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// events
START_BTN.onclick = () => {
    state = STATE.SELECT
    START_SECTION.classList.remove('show')
    SELECT_SECTION.classList.add('show')
}
SELECT_BTN.onclick = () => {
    state = STATE.PLAY
    SELECT_SECTION.classList.remove('show')
    PLAY_SECTION.classList.add('show')
    finished = false
    updateBoard()
}
RESET_BTN.onclick = () => {
    state = STATE.START
    PLAY_SECTION.classList.remove('show')
    START_SECTION.classList.add('show')
    moves = {}
    winner_moves = null
    finished = false
    document.querySelector('input[type="radio"][value="x"]').click()
}


// methods
function updateBoard() {
    updateBoardLabel()
    updateBoardCells()
}

function updateBoardCells() {
    BOARD.innerHTML = ''
    for (let i = 0; i < 9; i++) {
        BOARD.append(createBoardCell(i))
    }
}

function updateBoardLabel() {
    if (player == PLAYER.X) {
        BOARD_LABEL_X_PLAYER.classList.add('show')
        BOARD_LABEL_O_PLAYER.classList.remove('show')
    } else {
        BOARD_LABEL_X_PLAYER.classList.remove('show')
        BOARD_LABEL_O_PLAYER.classList.add('show')
    }
}

function checkGameState() {
    console.log(moves);
    winner_moves = null
    for (let i = 0; i < WC.length; i++) {
        let condition = WC[i];

        let move1 = moves[condition[0]]
        let move2 = moves[condition[1]]
        let move3 = moves[condition[2]]

        if (move1 && move2 && move3) {
            if (move1 == move2 && move2 == move3) {
                finished = true
                winner_moves = condition
                continue
            }
        }
    }
    console.log(`finished`, finished);
}

function createBoardCell(index) {
    let classes = ['cell'];
    if (moves.hasOwnProperty(index)) {
        if (moves[index] == PLAYER.X)
            classes.push('player-x')
        else
            classes.push('player-o')
    }
    if (winner_moves) {
        if (winner_moves.includes(index))
            classes.push('win')
        else
            classes.push('disabled')
    }

    let cell = document.createElement('div')
    cell.className = classes.join(' ')
    cell.innerHTML = [
        `<img class="player-icon player-x" src="/icons/x-mark.svg">`,
        `<img class="player-icon player-o" src="/icons/o-mark.svg">`
    ].join('')

    if (!finished && classes.length === 1)
        cell.onclick = () => handlePlayerMove(index)
    
    return cell
}

function handlePlayerMove(index) {
    moves[index] = player
    checkGameState()
    if (!finished)
        togglePlayer()
    updateBoard()
}

function togglePlayer() {
    if (player == PLAYER.X)
        player = PLAYER.O
    else
        player = PLAYER.X
}