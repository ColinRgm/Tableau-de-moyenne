let grades = {}

// Math et Anglais
let baseKnowledges = []

// ECG
let ecgKnowledges = []

// Modules EPSIC
let modules = []

// Module ICT
let cie = []

// Pondération (EPSIC - ICT)
let pondInfo = []

// Moyenne générale
let averageGeneral = []

// Pondération générale
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
        // updateInputsIfInLs()
    }
    arrayConstitutionAveragePlusWeight()
    registerEventsListenerOnInput()

})





// Mettre à jour les inputs si existant dans le local storage-----------------------------------------------------------
/* function updateInputsIfInLs() {
    for (let updatedGrades in grades) {
        document.getElementById(updatedGrades).value = grades[updatedGrades] ?? 'note'
    }
}

 */





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

    // Anglais Math ----------------------------------------------------------------------------------------------------
    baseKnowledges = [
        // Math
        grades['math_1'],
        grades['math_2'],
        grades['math_3'],
        grades['math_4'],
        grades['math_5'],
        grades['math_6'],
        grades['math_7'],
        grades['math_8'],
        grades['math_9'],
        grades['math_10'],
        grades['math_11'],
        grades['math_12'],
        grades['math_13'],
        grades['math_14'],
        grades['math_15'],
        grades['math_16'],
        grades['math_17'],
        grades['math_18'],
        grades['math_19'],
        grades['math_20'],
        grades['math_21'],
        grades['math_22'],
        grades['math_23'],
        grades['math_24'],
        grades['math_25'],
        grades['math_26'],
        grades['math_27'],
        grades['math_28'],
        grades['math_29'],
        grades['math_30'],
        grades['math_31'],
        grades['math_32'],
        grades['math_33'],
        grades['math_34'],
        grades['math_35'],
        grades['math_36'],
        grades['math_37'],
        grades['math_38'],
        grades['math_39'],
        grades['math_40'],

        // Anglais
        grades['english_1'],
        grades['english_2'],
        grades['english_3'],
        grades['english_4'],
        grades['english_5'],
        grades['english_6'],
        grades['english_7'],
        grades['english_8'],
        grades['english_9'],
        grades['english_10'],
        grades['english_11'],
        grades['english_12'],
        grades['english_13'],
        grades['english_14'],
        grades['english_15'],
        grades['english_16'],
        grades['english_17'],
        grades['english_18'],
        grades['english_19'],
        grades['english_20'],
        grades['english_21'],
        grades['english_22'],
        grades['english_23'],
        grades['english_24'],
        grades['english_25'],
        grades['english_26'],
        grades['english_27'],
        grades['english_28'],
        grades['english_29'],
        grades['english_30'],
        grades['english_31'],
        grades['english_32'],
        grades['english_33'],
        grades['english_34'],
        grades['english_35'],
        grades['english_36'],
        grades['english_37'],
        grades['english_38'],
        grades['english_39'],
        grades['english_40']
    ]

    let averageKnowledges = roundGrades(arrayAverage(baseKnowledges), 0.5)

    // ECG -------------------------------------------------------------------------------------------------------------
    /* ecgKnowledges = []
    start_index = 1
    end_index = 40

    for grade in ecgKnowledges(start_index, end_index+1): ecgKnowledges.append(grades['ecg_' + str(i)])

     */

    ecgKnowledges = [
        // 1er semestre
        grades['ecg_1'],
        grades['ecg_2'],
        grades['ecg_3'],
        grades['ecg_4'],
        grades['ecg_5'],
        grades['ecg_6'],
        grades['ecg_7'],
        grades['ecg_8'],
        grades['ecg_9'],
        grades['ecg_10'],
        // 2ème semestre
        grades['ecg_11'],
        grades['ecg_12'],
        grades['ecg_13'],
        grades['ecg_14'],
        grades['ecg_15'],
        grades['ecg_16'],
        grades['ecg_17'],
        grades['ecg_18'],
        grades['ecg_19'],
        grades['ecg_20'],
        // 3ème semestre
        grades['ecg_21'],
        grades['ecg_22'],
        grades['ecg_23'],
        grades['ecg_24'],
        grades['ecg_25'],
        grades['ecg_26'],
        grades['ecg_27'],
        grades['ecg_28'],
        grades['ecg_29'],
        grades['ecg_30'],
        // 4ème semestre
        grades['ecg_31'],
        grades['ecg_32'],
        grades['ecg_33'],
        grades['ecg_34'],
        grades['ecg_35'],
        grades['ecg_36'],
        grades['ecg_37'],
        grades['ecg_38'],
        grades['ecg_39'],
        grades['ecg_40']
    ]


    let averageEcgKnowledge = roundGrades(arrayAverage(ecgKnowledges), 0.5)

    // EPSIC -----------------------------------------------------------------------------------------------------------
    modules = [
        // 1ère
        grades['module_117'],
        grades['module_122'],
        grades['module_162'],
        grades['module_164'],
        grades['module_231'],
        grades['module_294'],
        grades['module_319'],
        grades['module_431'],
        // 2ème
        grades['module_114'],
        grades['module_165'],
        grades['module_254'],
        grades['module_320'],
        grades['module_322'],
        grades['module_346'],
        grades['module_347'],
        grades['module_426'],
        // 3ème
        grades['module_184'],
        grades['module_232'],
        grades['module_306'],
        grades['module_450'],
        // 4ème
        grades['module_241'],
        grades['module_245'],
        grades['module_321'],
        grades['module_324']
    ]

    let averageMod = roundGrades(arrayAverage(modules), 0.5)

    // CIE -------------------------------------------------------------------------------------------------------------
    cie = [
        // 1ère
        grades['cie_106'],
        grades['cie_110'],
        grades['cie_187'],
        // 2ème
        grades['cie_257'],
        grades['cie_294'],
        grades['cie_295'],
        // 3ème
        grades['cie_?'],
        grades['cie_185'],
        grades['cie_217'],
        grades['cie_223'],
        grades['cie_335']
    ]

    let averageCie = roundGrades(arrayAverage(cie), 0,5)


    // Moyenne informatique --------------------------------------------------------------------------------------------
    averageInfo = [
        averageMod,
        averageCie
    ]

    // Pondération EPSIC - CIE
    pondInfo = [80, 20]

    let averageInformatique = roundGrades(weightedAverage(averageInfo, pondInfo), 0.1)


    // Moyenne générale ------------------------------------------------------------------------------------------------
    averageGeneral = [
        averageKnowledges,
        averageEcgKnowledge,
        averageInformatique,
        grades['tpi'],
    ]

    // Pourcentages général
    generalPond = [10, 20, 30, 40]

    let averageGen = roundGrades(weightedAverage(averageGeneral, generalPond), 0.1)
    let result = yesOrNo(averageGen)

    displayAverages(averageKnowledges, averageEcgKnowledge, averageInformatique, averageGen, result)
}





// Réussi ou échec -----------------------------------------------------------------------------------------------------
function yesOrNo(average) {
    if (average <= 4.5 && average >= 1) {
        return "Courage, tu peux le faire !"
    } else if (average > 4.5) {
        return "Félicitation ! 🎉"
    } else {
        return "Pas de notes"
    }
}





// Changer les inputs sans load la page --------------------------------------------------------------------------------
function registerEventsListenerOnInput() {

    let inputs = document.getElementsByTagName('input')
    for (let input of inputs)
        input.addEventListener('change', getGradeValueFromHTML)
}





// Fonction de calcul des moyennes -------------------------------------------------------------------------------------
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
function displayAverages(averageKnowledges, averageEcgKnowledge, averageInformatique, averageGen, result) {

    document.getElementById("baseElargie").innerText = getNum(averageKnowledges)
    document.getElementById("cultureG").innerText = getNum(averageEcgKnowledge)
    document.getElementById("informatique").innerText = getNum(averageInformatique)
    document.getElementById("cfc").innerText = getNum(averageGen)
    document.getElementById('passOrFailed').innerText = (result)
}





/* Couleur input en fonction de la note --------------------------------------------------------------------------------
var input = document.getElementsByClassName('input')
input.addEventListener("input", function() {
    if (this.value === 4) {
      this.style.backgroundColor = "orange";
    }
    else if (this.value <= 4.5){
      this.style.backgroundColor = "green";
    }
    else {
        this.style.backgroundColor = "red";
    }
  });

 */