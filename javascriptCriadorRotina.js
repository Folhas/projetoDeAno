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
    1000, // calistenia
    1000, // academia
    30,   // hipertrofia
    30,   // emagrecimento
    30,   // definicao
    30,   // condicionamento
    30,   // forca
    90,   // iniciante
    70,   // medio
    50,   // avancado
    -999,   // pescoco
    -999,   // ombro
    -999,   // cotovelo
    -999,   // mao
    -999,   // costasSuperior
    -999,   // costasInferior
    -999,   // cintura
    -999,   // joelho
    -999    // pe
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

    mostrarInstrucao()

    document.getElementById('tabelaRotinaContainer').scrollIntoView({behavior: 'smooth'})

    debugFunction()
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
            // i < 10 significa que são os 10 primeiros itens dos pathExercicios (ou seja, os que não são as lesões)
            if (i < 10) {
                if (propriedadeExercicio == valorSelecionado) {
                exercicio.score = exercicio.score + multiplierAtual
                }
            }
            // Essa parte são as lesões
            else {
                if (propriedadeExercicio === false && valorSelecionado === true) { // Se o exercício requisitar e o usuário não tiver
                    exercicio.score = exercicio.score + multiplierAtual // Os multiplierAtual das lesões são todos negativos
                }
            }
        }
    })
}

function filterExercises(currCategory, currArray) {
    currArray.length = 0
    exercicios.forEach(function(exercicio) {
        if (exercicio.day == currCategory) {
            if (checkIfInclinedInExercise(exercicio)) {
                if (checkIfInclinedInArray(currArray) === false) {
                    currArray.push(exercicio)  
                }
            }
            else {
                currArray.push(exercicio)
            }
        }
    })
    currArray.sort(function(a, b) {
        return b.score - a.score
    })
    console.log(currArray)
}

function checkIfInclinedInArray(currArray) {
    for (let i = 0; i < currArray.length; i++) {
        if (currArray[i].nome && currArray[i].nome.includes('Inclinado' || 'inclinado')) {
            return true
        }
    }
    return false
}
function checkIfInclinedInExercise(exercicio) {
    if (exercicio.nome.includes('Inclinado' || 'inclinado')) {
        return true
    }
    return false
}

function divideInArray(currArray) {
    if (currArray.length > 6) {
        for (i = currArray.length; i > 6; i--) {
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
        dia1.push(...back)
        dia2.push(...chest)
        dia3.push(...legs)
    }
    else if (diasSelecionado === 4) {
        dia1.push(...arms)
        dia2.push(...back.slice(0, 5), ...core.slice(0, 1))
        dia3.push(...chest.slice(0, 5), ...core.slice(1, 2))
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
function mostrarInstrucao() {
    const tabelaDiv = document.getElementById('tabelaRotinaContainer')
    const instrucao = document.createElement('p')
    if (window.innerWidth < 900) { //caso seja a tela de um celular
        instrucao.innerHTML = 'Passe o dedo por cima dos exercícios para mostrar uma imagem de instrução.'
    }
    else {
        instrucao.innerHTML = 'Passe o mouse por cima dos exercícios para mostrar uma imagem de instrução.'
    }
    tabelaDiv.appendChild(instrucao)

    instrucao.id = 'instrucao'
}
function mostrarSetsXReps() {
    let setsXRepsValue
    const setsXRepsContainer = document.getElementById('setsXRepsContainer')
    setsXRepsContainer.innerHTML = ''

    const setsXReps = document.createElement('div')
    setsXReps.className = 'setsXReps'
    const setsXRepsString = document.createElement('h1')
    setsXReps.appendChild(setsXRepsString)
    if (hipertrofiaSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-5x6-8<br></br>Tempo de descanso: 2min'
    }
    if (emagrecimentoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-4x10-12<br></br>Tempo de descanso: 90s'
    }
    if (definicaoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3-4x12-15<br></br>Tempo de descanso: 60s-90s'
    }
    if (condicionamentoSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 2-4x12-15<br></br>Tempo de descanso: 30s'
    }
    if (forcaSelecionado === true) {
        setsXRepsValue = 'Número de séries e repetições: 3x4-6<br></br>Tempo de descanso: 2min-5min'
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




//--------------------------------DEBUGGING-------------------------------------------------------


let imageList = [
  'abdominalCrunch.png', 
  'abRollout.png', 
  'abWheelRollout.png', 
  'agachamentoExplosivoGiro.png', 
  'ankleHops.png', 
  'archerPushUp.png', 
  'archerPushUpAvancado.png', 
  'arnoldPress.png', 
  'assistedPistol.jpg', 
  'australianRow.png', 
  'bandBicpesCurl.png', 
  'barbellBackSquat.png', 
  'barbellCurl.png', 
  'benchDipsAssisted.png', 
  'benchPress.png', 
  'birdDog.png', 
  'bodyweightSquat.png', 
  'boxJump.png', 
  'bulgarianSplitSquat.png', 
  'cableCrossover.png', 
  'cableCrunch.png', 
  'cableWoodchopper.png', 
  'cableWoodchopperHigh.png', 
  'cableWoodchopperLow.png', 
  'calfRaise.jpg', 
  'chestFlyMachine.png', 
  'chinUp.png', 
  'chinUpAssistido.png', 
  'closeGripPushUps.png', 
  'concentrationCurl.png', 
  'curtsyLunge.png', 
  'deadBug.png', 
  'deadlift.png', 
  'declineBenchPress.png', 
  'diamondPushUp.png', 
  'dipsBanco.png', 
  'donkeyKick.jpg', 
  'dragonFlag.png', 
  'dumbbellFly.png', 
  'dumbbellHammerCurl.png', 
  'dumbbellPullover.png', 
  'facePull.png', 
  'flexaoDiamante.png', 
  'flexaoTradicional.png', 
  'forearmPushUps.png', 
  'forearmPushUps.png.png', 
  'frontLeverTuck.png', 
  'frontSquat.png', 
  'gluteBridge.png', 
  'goodMorning.png', 
  'hammerCurl.png', 
  'handstandPushUpParede.png', 
  'hanging Oblique Raise.png', 
  'hangingKneeRaise.png', 
  'hangingLegRaise.png', 
  'hangingLegRaiseTwist.png', 
  'hangingObliqueRaise.png', 
  'hipAbductionMachine.png', 
  'hipAdductionMachine.png', 
  'hipThrust.png', 
  'hipThrustUnilateral.jpg', 
  'hollowBodyHold.png', 
  'inclideRows.png', 
  'inclineBarbellPress.png', 
  'inclineBenchPress.png', 
  'inclineDumbbellPress.png', 
  'inclinePushUp.png', 
  'invertedRow.png', 
  'jumpingJacks.png', 
  'jumpSquat.webp', 
  'landminePress.png', 
  'latPulldown.png', 
  'legCurlMachine.png', 
  'legPress.png', 
  'legRaiseBarra.png', 
  'legRaises.png', 
  'lSit.png', 
  'machineChestFly.png', 
  'marchInPlace.png', 
  'medicineBallRussianTwist.png', 
  'mergulhoNoBanco.png', 
  'mountainClimber.png', 
  'mountainClimbers.png', 
  'oneArmDumbbellRow.png', 
  'overheadTricepsExtension.png', 
  'pikePushups.png', 
  'pistolSquat.png', 
  'pistolSquatAssistido.png', 
  'pistolSquatCompleto.png', 
  'plank.png', 
  'plankWithShoulderTap.png', 
  'ponteGluteoUnilateral.png', 
  'pranchaAlternada.png', 
  'pranchaShoulderTap.png', 
  'preacherCurl.png', 
  'pseudoPlanchePush.png', 
  'pullUp.png', 
  'pullUpAustraliana.png', 
  'pullUpCompleto.png', 
  'pullUpExplosivo.png', 
  'pullUpWeighted.png', 
  'pullUpWideGrip.png', 
  'pushUpKnees.png', 
  'pushUpPose.png', 
  'pushUpWeighted.png', 
  'puxadaNegativa.png', 
  'remadaAustraliana.png', 
  'reverseCrunch.png', 
  'reverseCrunchCable.png', 
  'reverseHyperextension.png', 
  'ringPushUp.png', 
  'ringRow.png', 
  'romanianDeadlift.png', 
  'russianTwist.png', 
  'russianTwists.png', 
  'seatedDumbbellPress.png', 
  'seatedRow.png', 
  'seatedRowMachine.png', 
  'shrimpSquat.png', 
  'shrugs.png', 
  'sideCrunch.png', 
  'sideLunge.jpg', 
  'sidePlank.png', 
  'sidePlankHipLift.png', 
  'sidePlankKnees.png', 
  'singleLegBridge.jpg', 
  'singleLegRDL.webp', 
  'skullCrusher.png', 
  'squatJump.png', 
  'stabilityBallPike.png', 
  'stabilityBallRollout.png', 
  'stabilityBallSideCrunc.png', 
  'stepUpBanco.png', 
  'stepUps.png', 
  'sumoDeadlift.png', 
  'sumoSquat.png', 
  'supermanHold.png', 
  'tBarRow.png', 
  'toesToBar.png', 
  'tricepPushdown.png', 
  'uprightRow.png', 
  'vSitUp.png', 
  'vUp.png', 
  'walkingLunge.png', 
  'wallPushUps.png', 
  'weighted-cossack-squats.webp', 
  'woodchopper.png'
]

function debugFunction() {
    // Helper to normalize filenames for comparison (case, spaces, dashes, accents)
    function normalizeName(name) {
        if (!name) return ''
        return name
            .toString()
            .toLowerCase()
            .normalize('NFD')                // split accents from letters
            .replace(/\p{Diacritic}/gu, '') // remove diacritics (accents)
            .replace(/\s+/g, '')            // remove spaces
            .replace(/[-_]/g, '')            // remove dashes/underscores
    }

    if (!Array.isArray(exercicios) || exercicios.length === 0) {
        console.log('Nenhum exercício carregado ainda.');
        return;
    }

    // build a set of normalized image filenames for fast lookup
    const imageSet = new Set(imageList.map(img => normalizeName(img)));

    // copy of exercicios to keep track of missing ones
    let exerciciosQueNaoAparecem = exercicios.slice();

    exercicios.forEach(function(exercicio) {
        const caminhoDaImagem = getNestedProperty(exercicio, 'img');
        if (!caminhoDaImagem) {
            // No image path present on this exercise — keep it in missing list
            console.log('Exercício sem propriedade img:', exercicio.nome || exercicio);
            return;
        }

        const fileName = caminhoDaImagem.split('/').pop();
        const normalized = normalizeName(fileName);

        if (imageSet.has(normalized)) {
            console.log('O exercício', exercicio.nome || fileName, 'aparece no arquivo de imagens!');
            // remove matching exercise from the missing list by matching normalized filename
            for (let i = exerciciosQueNaoAparecem.length - 1; i >= 0; i--) {
                const mImg = getNestedProperty(exerciciosQueNaoAparecem[i], 'img');
                if (!mImg) continue;
                const mFile = mImg.split('/').pop();
                if (normalizeName(mFile) === normalized) {
                    exerciciosQueNaoAparecem.splice(i, 1);
                    break;
                }
            }
        } else {
            console.log('Imagem NÃO encontrada para', exercicio.nome || fileName);
        }
    });

    console.log('Esses são os exercícios que não aparecem');
    exerciciosQueNaoAparecem.forEach(function(exercicio) {
        console.log(exercicio.nome)
    })
    console.log('Nome dos arquivos')
    exerciciosQueNaoAparecem.forEach(function(exercicio) {
        console.log(exercicio.img)
    })

}

