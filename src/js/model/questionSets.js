import uniqid from 'uniqid';

Array.prototype.shuffleArray = function () {
    var temp, j, n = this.length;
    while (--n > 0) {
        j = Math.floor(Math.random() * (n + 1));
        temp = this[j];
        this[j] = this[n];
        this[n] = temp;
    }
    console.log(this);

    return this;
}

export default class QuestionSets {
    constructor() {
        this.qsets = [];
    }

    addQuestionSet(quizName, questions, answerKey) {
        questions = removeEmptyLines(questions.value.split(/\n/));
        answerKey = removeEmptyLines(answerKey.value.split(/\n/));
        quizName = quizName.value;
        let choices = createChoices(answerKey);
        console.log(choices);

        choices.forEach(el => {
            el.shuffleArray();
        });
        const qset = {
            quizName: quizName,
            id: uniqid(),
            questions: questions,
            answerKey: answerKey,
            choices: choices
        }

        this.qsets.push(qset);
        console.log(qset);
        return qset;
    };

    deleteQuestionSet(id) {
        const index = this.qsets.findIndex(el => {
            el.id === id;
        })
        this.qsets.splice(index, 1);
    };
};

function removeEmptyLines(array) {
    for (let index = 0; index < array.length;) {
        const element = array[index];
        if (element === "") {
            array.splice(index, 1);
        } else {
            index++;
        }
    }
    return array;
}

function createChoices(answerKey) {
    const choices = [];

    for (let index = 0; index < answerKey.length; index++) {
        const element = answerKey[index];
        choices.push([...answerKey])
    };

    //Randomly remove elements until 3 are left except the right answer
    for (var i = 0; i <= choices.length - 1; i++) {
        let el = choices[i];
        while (el.length !== 3) {
            let curIndex = Math.floor(Math.random() * el.length)
            if (el[curIndex] !== answerKey[i]) {
                el.splice(curIndex, 1);
            }
        }
    };

    return choices;
}

