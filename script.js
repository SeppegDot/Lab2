const btnCreate = document.querySelector('.btnCreateVertex');
const vertexValue = document.querySelector('.vertexInput');
const dataEntry = document.querySelector('.dataEntry');
const btnResult = document.querySelector('.result');

let matrixInputs = [];

//lab 1-3
btnCreate.addEventListener('click', getValue);

function getValue() {
    const valueOfInput = vertexValue.value;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin',
            `
        <div class="first"> 
            <div>G<sup>-</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
        </div>
        `
        )
    }
    // btnOutMatrix.style.display = 'block';
    btnResult.addEventListener('click', Result);
}

function deleteBlock(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
}


function Result() {
    let data = getData();

    //Lab2
    // var Gtest = [
    //     [],
    //     [1,7,9],
    //     [2,6],
    //     [2,5,6],
    //     [10],
    //     [8],
    //     [1,8,10],
    //     [10],
    //     [10],
    //     []
    // ];

    let levels = getLevels(data);

    let matrixA = getAfromGminus(data);

    let newMatrixA = moveLines(matrixA, levels);

    let Gplus = getGplusFromA(newMatrixA);

    outputLevels(levels);
    outputGplus(Gplus);


    // console.log("Levels",levels)
    // console.log("A", matrixA);
    // console.log("new A", newMatrixA);

}

function getData() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);

    return dataOfInputs;
}

function getLevels(data) {

    let arr = data.slice(0);

    for (let t = 0; t < data.length; t++) {
        arr[t] = data[t].split(',');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }

    let levels = new Array();

    let G = arr.slice(0);
    let Gcopy = arr.slice(0);

    let level = 0;
    while (checkNotEnd(G, levels) && level < 10) {

        levels[level] = new Array();
        for (let i = 0; i < Gcopy.length; i++) {
            if (isNaN(Gcopy[i][0]) && searchInLevels(levels, i) == false) {
                levels[level].push(i);
            }

        }

        Gcopy = deleteFromG(Gcopy, levels, level)

        level++;


    }

    return levels;
}

function getAfromGminus(data) {
    let arr = data.slice(0);

    for (let t = 0; t < data.length; t++) {
        arr[t] = data[t].split(',');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }


    let matrixA = new Array();
    for (let i = 0; i < arr.length; i++) {
        matrixA[i] = new Array();
        for (let j = 0; j < arr.length; j++) {
            matrixA[i][j] = 0;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!isNaN(arr[i][j])) {
                matrixA[arr[i][j] - 1][i] = 1;
            }
        }
    }

    console.log(matrixA);

    return matrixA;
}

function getGplusFromA(matrixA) {
    var G = new Array();

    for (let i = 0; i < matrixA.length; i++) {
        G[i] = new Array();
        for (let j = 0; j < matrixA[i].length; j++) {
            if (matrixA[i][j] == 1) {
                G[i].push(j + 1);
            }
        }
    }

    return G;
}

function moveLines(matrix, levels) {
    let matrixA = matrix.slice(0);
    let newMatrixA = [];
    let tmp = 0;

    levels = toArr(levels);
    console.log(levels);

    for (let i = 0; i < matrixA.length; i++) {
        newMatrixA[i] = new Array();
        for (let j = 0; j < matrixA.length; j++) {
            newMatrixA[i][j] = matrixA[levels[i]][levels[j]];

        }
    }

    return newMatrixA;
}

function searchInLevels(levels, elem) {
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].includes(elem))
            return true;
    }

    return false;
}

function deleteFromG(G, levels, level) {
    for (let k = 0; k < levels[level].length; k++) {
        for (let j = 0; j < G.length; j++) {
            let el = G[j].indexOf(levels[level][k] + 1);
            if (el != -1) {
                G[j].splice(el, 1)
            }
        }
    }

    return G;
}

function toArr(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            result.push(arr[i][j]);
        }
    }

    return result;
}

function checkNotEnd(G, levels) {

    let Glen = G.length;

    levels = toArr(levels);
    let Lvllen = levels.length;

    console.log("s", Glen, "l", Lvllen)

    if (Glen == Lvllen)
        return false;
    else
        return true;


}

function outputGplus(G) {
    const dataEntry = document.querySelector('.data-output')

    for (let i = 0; i < G.length; i++) {
        var i1 = i + 1
        dataEntry.innerHTML += `<li class="list-group-item">G<sup>+</sup>` + '(' + i1 + ') = ' + '[ ' + G[i] + ' ]' + '</li>'
    }
}

function outputLevels(levels) {
    const dataEntry = document.querySelector('.levels-output')
    let tmp = 0;
    let per;
    for (let i = 0; i < levels.length; i++) {
        dataEntry.innerHTML += `<li class="list-group-item level-${i}">`;
        let lvl = document.querySelector(`.level-${i}`);
      lvl.insertAdjacentHTML('afterbegin' ,'Уровень ' + i + '</br>[');
      for (let j = 0; j < levels[i].length; j++) {
        per = levels[i][j] + 1
        tmp1 = tmp + 1
        lvl.insertAdjacentHTML('beforeend', ' ' + tmp1 + ` <sup>(${per})</sup> `);
        tmp++;
      }
      lvl.insertAdjacentHTML('beforeend',']');
    //   dataEntry.innerHTML += `</li>`;
    }
}