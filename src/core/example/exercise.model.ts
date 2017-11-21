import findLastIndex from 'lodash-es/findLastIndex';
import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import clone from 'lodash-es/clone';
import { QuestionModel } from './question.model';
import { action, computed, observable } from 'mobx-angular';
import { extendObservable, reaction } from 'mobx';

export interface Exercise {
    id: number;
    type: string;
    name: string;
    description: string;
    needValues: boolean;
    img: string;
    questions: Question[];
}

export interface Question {
    id: number;
    description: string;
    answerType: string;
    toRemember: boolean;
    answer?: any;
}

export class ExerciseModel implements Exercise {
    public id: number;
    public type: string;
    public name: string;
    public description: string;
    public needValues: boolean;
    public img: string;
    @observable public pickScopeInputs: string[] = [];
    @observable public questions: QuestionModel[];
    @observable public isLastQuestion: boolean = false;
    @observable private _currentQuestionNumber = 0;

    constructor(_exerciseData: Exercise) {
        const questions = _exerciseData.questions.map((q) => new QuestionModel(q));
        extendObservable(this, {
            id: _exerciseData.id,
            type: _exerciseData.type,
            name: _exerciseData.name,
            description: _exerciseData.description,
            needValues: _exerciseData.needValues,
            img: _exerciseData.img,
            _questionsModels: questions,
            questions,
        });

        reaction(
            () => this._currentQuestionNumber,
            () => {
                this.questions = this.formatQuestionsDescription(questions);
                this.isLastQuestion = this.questions[this.questions.length - 1].isOpen;
            }, {
                name: 'CurrentQuestionNumberChanged',
            }
        );
    }

    @computed
    public get lastQuestionAnswered(): number {
        const result = findLastIndex(this.questions, 'hasAnswer');
        return result === -1 ? 0 : result;
    }

    @computed
    public get currentQuestionNumber(): number {
        return this._currentQuestionNumber;
    }

    public set currentQuestionNumber(val: number) {
        if (val != null) {
            val = Number(val);
            this._currentQuestionNumber = val;
            this.toggleIsOpen(val);
        }
    }

    @computed
    public get totalNumQuestions(): number {
        return this.questions.length;
    }

    @action
    public toggleIsOpen(questionToBeOpened: number): void {
        questionToBeOpened = Math.floor(questionToBeOpened);
        this.questions.forEach((question) => {
            question.isOpen = question.id === questionToBeOpened;
        });
    }

    @action
    private formatQuestionsDescription(questions: QuestionModel[]): QuestionModel[] {
        questions.forEach((question: QuestionModel) => {
            question.description = clone(question.originalDescription);
            if (question.description.search(/%fill[0-9]%/) > -1) { // Prendere una decisione
                questions.forEach((q: QuestionModel) => {
                    // Troviamo la domanda che contiene i vari box
                    if (q.answer.length > 1 && q.toRemember && q.answerType.search('box') > -1) {
                        let k = 1;
                        q.answer.forEach((answer: any) => {
                            question.description =
                                question.description.replace(`%fill${k}%`, `<strong>${answer}</strong>`);
                            k += 1;
                        });
                    }
                });
            }

            if (question.description.search(/%fill%/) > -1) {
                const risp = filter(questions, {
                    toRemember: true,
                });

                if (risp.length === 1) {
                    question.description =
                        question.description.replace('%fill%', `<strong>${risp[0].answer}</strong>`);
                }
                if (risp.length > 1) { // Usato nell'esercizio sull'assertività
                    question.description =
                        question.description.replace('%fill%',
                            `<strong>${map(risp, (o) => o.answer).join('<br />')}</strong>`);
                }
            }
        });
        return questions;
    }
}
