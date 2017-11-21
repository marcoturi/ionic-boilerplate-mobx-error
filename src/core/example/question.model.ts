import fill from 'lodash-es/fill';
import clone from 'lodash-es/clone';
import { computed, observable } from 'mobx-angular';
import { extendObservable } from 'mobx';
import { Question } from './exercise.model';

export class QuestionModel {
    public id: number;
    public description: string;
    public readonly originalDescription: any;
    public answerType: string;
    public toRemember: boolean;
    @observable public hasAnswer: boolean = false;
    @observable public isOpen: boolean;
    @observable private _answer: any = null;

    constructor(_questionData: Question) {
        extendObservable(this, {
            id: _questionData.id,
            description: _questionData.description,
            originalDescription: clone(_questionData.description),
            answerType: _questionData.answerType,
            toRemember: _questionData.toRemember,
            answer: _questionData.answer || null,
            isOpen: _questionData.id === 0 ? true : null,
        });
    }

    @computed
    public get answer(): any {
        if (this._answer == null) {
            switch (this.answerType) {
                case 'textarea':
                    this._answer = '';
                    break;
                case 'range':
                    this._answer = 5;
                    break;
                case 'none':
                    this._answer = '';
                    break;
                default:
                    this._answer = '';
            }

            if (this.answerType.search('box') > -1) {
                let numTextForms = parseInt(this.answerType.replace('box', ''), 10);
                numTextForms = numTextForms > 0 ? numTextForms : 1;
                this._answer = fill(Array(numTextForms), '');
            }
        }

        return this._answer;
    }

    public set answer(val: any) {
        if (val != null) {
            this._answer = val;
            this.hasAnswer = true;
        }
    }
}
