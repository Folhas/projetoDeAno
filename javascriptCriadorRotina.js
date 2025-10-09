// Lista de parametros 

let valueTipoTreino
let valueObjetivo
let valueNivel
let valueIdade
let diasSelecionado
let pescocoSelecionado
let ombroSelecionado
let cotoveloSelecionado
let maoSelecionado
let costasSuperiorSelecionado
let costasInferiorSelecionado
let cinturaSelecionado
let joelhoSelecionado
let peSelecionado

let calisteniaSelecionado = false;
let academiaSelecionado = false;
let hipertrofiaSelecionado = false;
let emagrecimentoSelecionado = false;
let definicaoSelecionado = false;
let condicionamentoSelecionado = false;
let forcaSelecionado = false;
let inicianteSelecionado = false;
let medioSelecionado = false;
let avancadoSelecionado = false;



const pathExercicios = [
    'tipoTreino.calistenia',
    'tipoTreino.academia',
    'objetivo.hipertrofia',
    'objetivo.emagrecimento',
    'objetivo.definicao',
    'objetivo.condicionamento',
    'objetivo.forca',
    'nivel.iniciante',
    'nivel.medio',
    'nivel.avancado',
    'lesao.pescoco',
    'lesao.ombro',
    'lesao.cotovelo',
    'lesao.mao',
    'lesao.costasSuperior',
    'lesao.costasInferior',
    'lesao.cintura',
    'lesao.joelho',
    'lesao.pe'
]

const scoreMultipliers = [
    1000,
    1000,
    30,
    30,
    30,
    30,
    30,
    90,
    70,
    50,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80,
    80
]

// Fim das listas de parametros

let exercicios = []
fetch('exercicios1.JSON').then(function(response) {
  return response.json()
}).then(function(data) {
  exercicios = Object.values(data)
})

let arms = []
let legs = []
let core = []
let chest = []
let back = []

let dia1 = []
let dia2 = []
let dia3 = []
let dia4 = []
let dia5 = []

//Começo das funções

function confirmar() {
    getValues()
    setExerciseScore(getSelecionados())

    filterExercises('arms', arms)
    divideInArray(arms)

    filterExercises('legs', legs)
    divideInArray(legs)

    filterExercises('core', core)
    divideInArray(core)

    filterExercises('back', back)
    divideInArray(back)

    filterExercises('chest', chest)
    divideInArray(chest)


    divideInDays()

    mostrarTabelaRotina()

    mostrarSetsXReps()
}

function getValues() {
    calisteniaSelecionado = false;
    academiaSelecionado = false;
    hipertrofiaSelecionado = false;
    emagrecimentoSelecionado = false;
    definicaoSelecionado = false;
    condicionamentoSelecionado = false;
    forcaSelecionado = false;
    inicianteSelecionado = false;
    medioSelecionado = false;
    avancadoSelecionado = false;
    pescocoSelecionado = false;
    ombroSelecionado = false;
    cotoveloSelecionado = false;
    maoSelecionado = false;
    costasSuperiorSelecionado = false;
    costasInferiorSelecionado = false;
    cinturaSelecionado = false;
    joelhoSelecionado = false;
    peSelecionado = false;

    valueTipoTreino = Number(document.getElementById('tipoTreinoXOR').value);
    valueObjetivo = Number(document.getElementById('objetivoXOR').value);
    valueNivel = Number(document.getElementById('nivelXOR').value);
    valueIdade = Number(document.getElementById('idadeXOR').value);
    diasSelecionado = Number(document.getElementById('diasXOR').value) + 1;
    pescocoSelecionado = document.getElementById('lesaoPescoco').checked;
    ombroSelecionado = document.getElementById('lesaoOmbro').checked;
    cotoveloSelecionado = document.getElementById('lesaoCotovelo').checked;
    maoSelecionado = document.getElementById('lesaoMao').checked;
    costasSuperiorSelecionado = document.getElementById('lesaoCostasSuperior').checked;
    costasInferiorSelecionado = document.getElementById('lesaoCostasInferior').checked;
    cinturaSelecionado = document.getElementById('lesaoCintura').checked;
    joelhoSelecionado = document.getElementById('lesaoJoelho').checked;
    peSelecionado = document.getElementById('lesaoPe').checked;

    if (valueTipoTreino === 0) {
        calisteniaSelecionado = true
    }
    else if (valueTipoTreino === 1) {
        academiaSelecionado = true
    }


    if (valueObjetivo === 0) {
        hipertrofiaSelecionado = true
    }
    else if (valueObjetivo === 1) {
        emagrecimentoSelecionado = true
    }
    else if (valueObjetivo === 2) {
        definicaoSelecionado = true
    }
    else if (valueObjetivo === 3) {
        condicionamentoSelecionado = true
    }
    else if (valueObjetivo === 4) {
        forcaSelecionado = true
    }


    if (valueNivel === 0) {
        inicianteSelecionado = true
    }
    else if (valueNivel === 1) {
        medioSelecionado = true
    }
    else if (valueNivel === 2) {
        avancadoSelecionado = true
    }
}

function getSelecionados() {
    return [
        calisteniaSelecionado,
        academiaSelecionado,
        hipertrofiaSelecionado,
        emagrecimentoSelecionado,
        definicaoSelecionado,
        condicionamentoSelecionado,
        forcaSelecionado,
        inicianteSelecionado,
        medioSelecionado,
        avancadoSelecionado,
        pescocoSelecionado,
        ombroSelecionado,
        cotoveloSelecionado,
        maoSelecionado,
        costasSuperiorSelecionado,
        costasInferiorSelecionado,
        cinturaSelecionado,
        joelhoSelecionado,
        peSelecionado
    ]
}

function setExerciseScore(selecionados) {
    exercicios.forEach(function(exercicio){
        setNestedProperty(exercicio, 'score', 0)
        for(i = 0; i < selecionados.length; i++) {
            let pathAtual = pathExercicios[i]
            let valorSelecionado = selecionados[i]
            let multiplierAtual = scoreMultipliers[i]
            let propriedadeExercicio = getNestedProperty(exercicio, pathAtual)
            if (propriedadeExercicio == valorSelecionado) {
                exercicio.score = exercicio.score + multiplierAtual
            }
        }
    })
}

function filterExercises(currCategory, currArray) {
    currArray.length = 0
    exercicios.forEach(function(exercicio) {
        if (exercicio.day == currCategory) {

            currArray.push(exercicio)
        }
    })
    currArray.sort(function(a, b) {
        return b.score - a.score
    })
    console.log(currArray)
}

function divideInArray(currArray) {

    let exerciciosPorCategoria

    if (diasSelecionado === 1 || diasSelecionado === 2 || diasSelecionado === 5) {
        exerciciosPorCategoria = diasSelecionado
    }
    else if (diasSelecionado === 3 || diasSelecionado === 4) {
        exerciciosPorCategoria = 3
    }
    if (currArray.length > exerciciosPorCategoria) {
        for (i = currArray.length; i > exerciciosPorCategoria; i--) {
            currArray.pop()
        }
    }
}

function divideInDays() {
    dia1 = []
    dia2 = []
    dia3 = []
    dia4 = []
    dia5 = []

    if (diasSelecionado === 1) {
        dia1.push(...arms, ...legs, ...core, ...chest, ...back)    
    }
    else if (diasSelecionado === 2) {
        dia1.push(...arms, ...legs)
        dia2.push(...core, ...chest, ...back)
    }
    else if (diasSelecionado === 3) {
        dia1.push(...arms, ...legs)
        dia2.push(...core, ...back)
        dia3.push(...chest)
    }
    else if (diasSelecionado === 4) {
        dia1.push(...arms)
        dia2.push(...core, ...back)
        dia3.push(...chest)
        dia4.push(...legs)
    }
    else if (diasSelecionado === 5) {
        dia1.push(...arms)
        dia2.push(...core)
        dia3.push(...chest)
        dia4.push(...legs)
        dia5.push(...back)
    }
}

function getNestedProperty(obj, path) {
    return path.split('.').reduce(function(prev, curr) {
        if (prev) {
            return prev[curr];
        } else {
            return undefined;
        }
    }, obj);
}
function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}
function mostrarTabelaRotina() {
    const dias = [dia1, dia2, dia3, dia4, dia5];
    const nomesDias = ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5'];
    const tabelaDiv = document.getElementById('tabelaRotinaContainer');
    tabelaDiv.innerHTML = ''; // Clear previous table

    // Find the max number of exercises in any day
    const maxExercicios = Math.max(...dias.map(d => d.length));

    // Create table
    const table = document.createElement('table');
    table.border = 1;
    table.className = 'tabelaRotina'

    // Header row
    const header = document.createElement('tr');
    for (i = 0; i < diasSelecionado; i++) {
        let nome = nomesDias[i]
        const th = document.createElement('th');
        th.textContent = nome;
        header.appendChild(th);
    }
    table.appendChild(header);

    // Rows for exercises
    for (let i = 0; i < maxExercicios; i++) {
        const row = document.createElement('tr');
        for (let d = 0; d < diasSelecionado; d++) {
            const td = document.createElement('td');
            if (dias[d][i]) {
                td.textContent = dias[d][i].nome || dias[d][i].day || 'Exercício';
                if (dias[d][i].img) {
                    td.setAttribute('data-img', dias[d][i].img);
                    td.classList.add('exercise-hover');
                }
            }
            else {
                td.textContent = '';
            }
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    tabelaDiv.appendChild(table);
}
document.addEventListener('DOMContentLoaded', function() {
    const preview = document.getElementById('exercisePreview');
    const previewImg = document.getElementById('exercisePreviewImg');

    document.body.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('exercise-hover') && e.target.dataset.img) {
            previewImg.src = e.target.dataset.img;
            preview.style.display = 'block';
        }
    });

    document.body.addEventListener('mousemove', function(e) {
        if (preview.style.display === 'block') {
            preview.style.left = (e.pageX + 20) + 'px';
            preview.style.top = (e.pageY - 10) + 'px';
        }
    });

    document.body.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('exercise-hover')) {
            preview.style.display = 'none';
            previewImg.src = '';
        }
    });
});
function mostrarSetsXReps() {
    let setsXRepsValue
    const setsXRepsContainer = document.getElementById('setsXRepsContainer')
    setsXRepsContainer.innerHTML = ''

    const setsXReps = document.createElement('div')
    setsXReps.className = 'setsXReps'
    const setsXRepsString = document.createElement('h1')
    setsXReps.appendChild(setsXRepsString)
    if (hipertrofiaSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-5x6-12<br></br>Tempo de descanso: 30s-90s'
    }
    if (emagrecimentoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-4x12-15<br></br>Tempo de descanso: 30s-90s'
    }
    if (definicaoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-4x12-15<br></br>Tempo de descanso: 30s-90s'
    }
    if (condicionamentoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 2-4x12-20<br></br>Tempo de descanso: Mínimo'
    }
    if (forcaSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 4-6x1-6<br></br>Tempo de descanso: 2min-5min'
    }
    setsXRepsString.innerHTML = setsXRepsValue
    setsXRepsContainer.appendChild(setsXReps)

    const setsXRepsDisclaimer = document.createElement('p')
    setsXRepsDisclaimer.innerHTML = 'O número de séries e repetições varia. Teste quantidades diferentes para ver qual se encaixa melhor para você (que esteja entre o valor já recomendado). O mesmo vale para a carga, o peso que você deve carregar deve ser o suficiente para o último exercício da última série ser o seu limite, tome muito cuidado para não ter sobrecarga de peso e nem subcarga.'
    setsXReps.appendChild(setsXRepsDisclaimer)

    if (valueIdade === 0) {
        setsXRepsDisclaimer.innerHTML += ' Como você colocou ser de menor, tenha um cuidado extra com a carga para evitar sérios ferimentos.'
    }
    else if (valueIdade === 2) {
        setsXRepsDisclaimer.innerHTML += ' Como você colocou ter mais de 50 anos, tenha muito cuidado com os exercícios, não coloque muito esforço no treino para evitar sérios ferimentos.'
    }
    setsXRepsDisclaimer.innerHTML += ' <br></br>Essa rotina é apenas uma sugestão gerada por uma inteligência artificial, consulte um especialista caso tenha dúvidas e pare de realizar os exercícios em caso de dor excessiva ou mal-estar. Você conhece o seu corpo e seus limites, cada pessoa é diferente, experiemente diferentes números de séries, repetições e peso até encontrar a melhor combinação para você.'
}