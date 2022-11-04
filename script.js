let grades = {}
let baseKnowledges = []
let ecgKnowledges = []
let modulesICT = []
let ictPond = []
let averageGeneral = []
let generalPond = []


// Afficher 0 lors de case vides ---------------------------------------------------------------------------------------
function getNum(number) {
    if (number === null || isNaN(number) || number === undefined) {
        return "0";
    } else {
        return (number)
    }
}


//* Le code à exécuter lorsque l'événement load est émis ---------------------------------------------------------------
window.addEventListener('load', function () {

    if (localStorage.getItem('storageGrades') === null) {
        getGradeValueFromHTML()
    } else {
        grades = JSON.parse(localStorage.getItem('storageGrades'))
        updateInputsIfInLs()
    }
    arrayConstitutionAveragePlusWeight()
    registerEventsListenerOnInput()

})


// Mettre à jour les inputs si existant dans le local storage-----------------------------------------------------------
function updateInputsIfInLs() {
    for (let updatedGrades in grades) {
        document.getElementById(updatedGrades).value = grades[updatedGrades] ?? "Note"
    }
}


// Récupérer les valeurs depuis HTML -----------------------------------------------------------------------------------
function getGradeValueFromHTML() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        grades[input.id] = parseFloat(input.value)
    }
    arrayConstitutionAveragePlusWeight()
    localStorage.setItem('storageGrades', JSON.stringify(grades))
}

function arrayConstitutionAveragePlusWeight() {

    // Mettre dans les différents tableaux les notes concernées ------------------------------------------------------------

    // Anglais Math -------------
    baseKnowledges = [
        grades['math_1'],
        grades['math_2'],
        grades['[math_3'],
        grades['english_1'],
        grades['english_2'],
        grades['english_3'],
        grades['english_4'],
        grades['english_5'],
    ]

    let averageKnowledges = roundGrades(arrayAverage(baseKnowledges), 0.5)

    // ECG ----------------------
    ecgKnowledges = [
        grades['ecg_1'],
        grades['ecg_2'],
        grades['ecg_3'],
        grades['ecg_4'],
        grades['ecg_5'],
        grades['ecg_6'],
        grades['ecg_7'],
        grades['ecg_8'],
    ]

    let averageEcgKnowledge = roundGrades(arrayAverage(ecgKnowledges), 0.5)

    // Module et CIE ------------
    modulesICT = [
        grades['module'],
        grades['cie'],
    ]

    // Pondérations ICT ---------
    ictPond = [80, 20]

    let averageModuleIct = roundGrades(weightedAverage(modulesICT, ictPond), 0.1)

    // Moyenne générale ---------
    averageGeneral = [
        averageKnowledges,
        averageEcgKnowledge,
        averageModuleIct,
        grades['tpi'],
    ]

    // Pourcentages général -------------
    generalPond = [
        grades['percent-cbe'],
        grades['percent-ecg'],
        grades['percent-cei'],
        grades['percent-tpi'],
    ]

    let averageGen = roundGrades(weightedAverage(averageGeneral, generalPond), 0.1)
    let result = yesOrNo(averageGen)

    displayAverages(averageKnowledges, averageEcgKnowledge, averageModuleIct, averageGen, result)

}
    // Réussi ou échec ------------------
    function yesOrNo(average){
        if (average <= 4.5){
            return "Courage, tu peux le faire !"
        }
        else if (average === 0){
            return "Pas de note = pas de moyenne"
        }
        else {
            return "Félicitation ! 🎉"
        }
    }


// Changer les inputs sans load la page --------------------------------------------------------------------------------
function registerEventsListenerOnInput() {

    let inputs = document.getElementsByTagName('input')
    for (let input of inputs)
        input.addEventListener('change', getGradeValueFromHTML)
}


// Function de calcul des moyennes -------------------------------------------------------------------------------------
function arrayAverage(myArray) {
    let sum = 0
    let divider = 0

    for (let i = 0; i < myArray.length; i++) {

        if (!isNaN(myArray[i]) ? myArray[i] !== null : false) {
            sum += myArray[i]
            divider++
        }
    }
    return (sum / divider)

}


// Pondération des moyennes --------------------------------------------------------------------------------------------
function weightedAverage(myArray, weightArray) {


    let sum = 0
    let divider = 0

    for (let i = 0; i < myArray.length; i++) {
        if (!isNaN(myArray[i]) ? myArray[i] !== null : false) {
            sum = sum + (myArray[i] * weightArray[i])
            divider += weightArray[i]
        }
    }

    return (sum / divider)
}


// Arrondir les moyennes -----------------------------------------------------------------------------------------------
function roundGrades(number, multiple) {
    return (Math.round(number / multiple) * multiple).toFixed(1)
}


// Afficher notes dans le HTML -----------------------------------------------------------------------------------------
function displayAverages(averageKnowledges, averageEcgKnowledge, averageModuleIct, averageGen, result) {

    document.getElementById("cbe").innerText = getNum(averageKnowledges)
    document.getElementById("ecg").innerText = getNum(averageEcgKnowledge)
    document.getElementById("cei").innerText = getNum(averageModuleIct)
    document.getElementById("cfc").innerText = getNum(averageGen)
    document.getElementById("passOrFailed").innerText = (result)
}
