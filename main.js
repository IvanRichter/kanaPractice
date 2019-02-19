'use strict';
const KANA = [
    [
        ['', ''], 
        ['A', 'A'], 
        ['I', 'I'], 
        ['U', 'U'], 
        ['E', 'E'], 
        ['O', 'O']],
    [
        ['X', 'X'],
        ['あ', 'ア', 'a'],
        ['い', 'イ', 'i'],
        ['う', 'ウ', 'u'],
        ['え', 'エ', 'e'],
        ['お', 'オ', 'o']
    ],
    [
        ['K', 'K'],
        ['か', 'カ', 'ka'],
        ['き', 'キ', 'ki'],
        ['く', 'ク', 'ku'],
        ['け', 'ケ', 'ke'],
        ['こ', 'コ', 'ko']
    ],
    [
        ['G', 'G'],
        ['が', 'ガ', 'ga'],
        ['ぎ', 'ギ', 'gi'],
        ['ぐ', 'グ', 'gu'],
        ['げ', 'ゲ', 'ge'],
        ['ご', 'ゴ', 'go']
    ],
    [
        ['S', 'S'],
        ['さ', 'サ', 'sa'],
        ['し', 'シ', 'shi'],
        ['す', 'ス', 'su'],
        ['せ', 'セ', 'se'],
        ['そ', 'ソ', 'so']
    ],
    [
        ['Z', 'Z'],
        ['ざ', 'ザ', 'za'],
        ['じ', 'ジ', 'ji'],
        ['ず', 'ズ', 'zu'],
        ['ぜ', 'ゼ', 'ze'],
        ['ぞ', 'ゾ', 'zo']
    ],
    [
        ['T', 'T'],
        ['た', 'タ', 'ta'],
        ['ち', 'チ', 'chi'],
        ['つ', 'ツ', 'tsu'],
        ['て', 'テ', 'te'],
        ['と', 'ト', 'to']
    ],
    [
        ['D', 'D'],
        ['だ', 'ダ', 'da'],
        ['ぢ', 'ヂ', 'di'],
        ['づ', 'ヅ', 'dzu'],
        ['で', 'デ', 'de'],
        ['ど', 'ド', 'do']
    ],
    [
        ['N', 'N'],
        ['な', 'ナ', 'na'],
        ['に', 'ニ', 'ni'],
        ['ぬ', 'ヌ', 'nu'],
        ['ね', 'ネ', 'ne'],
        ['の', 'ノ', 'no']
    ],
    [
        ['H', 'H'],
        ['は', 'ハ', 'ha'],
        ['ひ', 'ヒ', 'hi'],
        ['ふ', 'フ', 'fu'],
        ['へ', 'ヘ', 'he'],
        ['ほ', 'ホ', 'ho']
    ],
    [
        ['B', 'B'],
        ['ば', 'バ', 'ba'],
        ['び', 'ビ', 'bi'],
        ['ぶ', 'ブ', 'bu'],
        ['べ', 'ベ', 'be'],
        ['ぼ', 'ボ', 'bo']
    ],
    [
        ['P', 'P'],
        ['ぱ', 'パ', 'pa'],
        ['ぴ', 'ピ', 'pi'],
        ['ぷ', 'プ', 'pu'],
        ['ぺ', 'ペ', 'pe'],
        ['ぽ', 'ポ', 'po']
    ],
    [
        ['M', 'M'],
        ['ま', 'マ', 'ma'],
        ['み', 'ミ', 'mi'],
        ['む', 'ム', 'mu'],
        ['め', 'メ', 'me'],
        ['も', 'モ', 'mo']
    ],
    [
        ['Y', 'Y'],
        ['や', 'ヤ', 'ya'],
        ['', '', ''],
        ['ゆ', 'ユ', 'yu'],
        ['', '', ''],
        ['よ', 'ヨ', 'yo']
    ],
    [
        ['R', 'R'],
        ['ら', 'ラ', 'ra'],
        ['り', 'リ', 'ri'],
        ['る', 'ル', 'ru'],
        ['れ', 'レ', 're'],
        ['ろ', 'ロ', 'ro']
    ],
    [
        ['W', 'W'],
        ['わ', 'ワ', 'wa'],
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
        ['を', 'ヲ', 'wo']
    ],
    [
        ['(n)', '(n)'],
        ['ん', 'ン', 'n'],
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
];
let tested = [];
let correctAnswer = '';
let score = 0;
let correctCount = 0;
let totalCount = 0;

let scoreDisplay = document.querySelector('.scoreDisplay');
let accDisplay = document.querySelector('.accuracyDisplay');

let hiraganaGrid = createGrid('hiragana', 17, 6);
document.querySelector('.tableDiv').appendChild(hiraganaGrid);

let katakanaGrid = createGrid('katakana', 17, 6);
document.querySelector('.tableDiv').appendChild(katakanaGrid);

function start() {
    end();
    tested = [];
    let elements = document.querySelectorAll('.clicked');
    if (elements.length === 0) {
        //if no characters are selected, select all of hiragana by default
        selectKana('hiragana');
        start();
    }
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].innerHTML.match(/[A-Za-z]/)) {
            //pushes everything except the row and column labels into the queue
            tested.push([elements[i].innerHTML, elements[i].title]);
        }
    }

    turn();
}

function selectKana(kana) {
    let elements = document.querySelectorAll(`.${kana}Cell`);
    let clicked = document.querySelectorAll(`.${kana}Cell.clicked`);

    if (clicked.length === 92) {
        //if all of the kana(92, including row and column labels) are selected, this unselects them
        for (let element of elements) {
            element.className = element.className.replace(/ clicked/gi, '');
        }
    } else {
        for (let element of elements) {
            element.className += ' clicked';
        }
    }
}

function answer(button) {
    let display = document.querySelector('.mainDisplay');
    if (button.innerHTML === correctAnswer) {
        //correct answer
        totalCount++;
        correctCount++;
        score++;

        //make the display flash green
        display.className += ' correct';
        setTimeout(() => {
            display.className = display.className.replace(/ correct/gi, '');
        }, 150);

        turn();
    } else {
        //wrong answer
        totalCount++;
        score--;

        //make the display flash red
        display.className += ' wrong';
        setTimeout(() => {
            display.className = display.className.replace(/ wrong/gi, '');
        }, 150);

        updateScore();
    }
}

function turn() {
    updateScore();

    let display = document.querySelector('.mainDisplay');

    //select a random characacter from the queue, display the kana, save the reading to correctAnswer
    let correct = ~~(Math.random() * tested.length);
    display.innerHTML = tested[correct][0];
    correctAnswer = tested[correct][1];

    let buttons = document.querySelectorAll('.answerButton');

    //apply the correct answer to a random button, apply a random reading to every other button
    let correctButton = ~~(Math.random() * buttons.length);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'initial';
        if (i === correctButton) {
            buttons[i].innerHTML = correctAnswer;
        } else {
            buttons[i].innerHTML = tested[~~(Math.random() * tested.length)][1];
        }
    }

    if (!document.querySelector('.checkboxLoop').checked) {
        //removes correctly answered characters from the queue
        tested.splice(correct, 1);
        if (tested.length === 0) {
            //if the queue is empty, hide the answer buttons and end
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.display = 'none';
            }
            end();
        }
    }
}

function end() {
    //the last remaining character is considered as anwsered correctly
    score++;
    correctCount++;
    totalCount++;
    updateScore();
    totalCount = 0;
    score = 0;
    correctCount = 0;
}

function updateScore() {
    //calculates and displays score + accuracy
    scoreDisplay.innerHTML = `Score: ${score}`;
    let accuracy;

    //Math.round() returns NaN for 0/0, 0/0 is considered 100%
    if (Math.round((correctCount / totalCount) * 100)) {
        accuracy = Math.round((correctCount / totalCount) * 100);
    } else {
        accuracy = 100;
    }

    accDisplay.innerHTML = `Accuracy: ${correctCount}/${totalCount} (${accuracy}%)`;
}

function createGrid(name, rows, columns) {
    let cellContent = [];

    //KANA[index][index][0] is hiragana, [1] is katakana, [2] is the reading
    if (name === 'hiragana') {
        for (let i = 0; i < KANA.length; i++) {
            for (let j = 0; j < KANA[0].length; j++) {
                cellContent.push([KANA[i][j][0], [KANA[i][j][2]]]);
            }
        }
    }
    if (name === 'katakana') {
        for (let i = 0; i < KANA.length; i++) {
            for (let j = 0; j < KANA[0].length; j++) {
                cellContent.push([KANA[i][j][1], [KANA[i][j][2]]]);
            }
        }
    }

    let grid = document.createElement('table');
    grid.className = `${name} kanaTable`;

    //create the grid and push either hiragana or katakana into it
    let i = 0;
    for (let r = 0; r < rows; r++) {
        let tr = grid.appendChild(document.createElement('tr'));
        for (let c = 0; c < columns; c++) {
            let cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = cellContent[i][0];
            cell.title = cellContent[i][1];
            i++;

            if (cell.innerHTML !== '') {
                cell.addEventListener('click', () => selectCell(cell));
                cell.className += ` row${r} column${c} ${name}Cell`;
            }
        }
    }
    return grid;
}

function selectCell(cell, clicking) {
    if (cell.className.includes('clicked') || clicking === false) {
        /*****unclicking*****/
        cell.className = cell.className.replace(/ clicked/gi, '');

        //unclicks whole column
        if (cell.className.includes('row0')) {
            let selector = `.${cell.className.split(' ')[[2]]}.${
                cell.className.split(' ')[[3]]
            } `;
            let elements = document.querySelectorAll(selector);

            for (let i = 1; i < elements.length; i++) {
                //prevents affecting ん/ン
                if (elements[i].innerHTML.match(/[んン]/)) {
                    break;
                }
                elements[i].className += ' clicked';
                selectCell(elements[i]);
            }
        }

        //unclicks whole row
        if (cell.className.includes('column0')) {
            let selector = `.${cell.className.split(' ')[[1]]}.${
                cell.className.split(' ')[[3]]
            } `;
            let elements = document.querySelectorAll(selector);

            for (let i = 1; i < elements.length; i++) {
                elements[i].className += ' clicked';
                selectCell(elements[i]);
            }
        }
    } else {
        /*****clicking*****/
        cell.className += ' clicked';

        //clicks whole column
        if (cell.className.includes('row0')) {
            let selector = `.${cell.className.split(' ')[[2]]}.${
                cell.className.split(' ')[[3]]
            } `;
            let elements = document.querySelectorAll(selector);

            for (let i = 1; i < elements.length; i++) {
                //prevents affecting ん/ン
                if (elements[i].innerHTML.match(/[んン]/)) {
                    break;
                }
                elements[i].className = elements[i].className.replace(
                    / clicked/gi,
                    ''
                );
                selectCell(elements[i]);
            }
        }

        //clicks whole row
        if (cell.className.includes('column0')) {
            let selector = `.${cell.className.split(' ')[[1]]}.${
                cell.className.split(' ')[[3]]
            } `;
            let elements = document.querySelectorAll(selector);

            for (let i = 1; i < elements.length; i++) {
                elements[i].className = elements[i].className.replace(
                    / clicked/gi,
                    ''
                );
                selectCell(elements[i]);
            }
        }
    }
}