// import { controlCost, stripAnswers } from '../exercises-manager.mock.spec';
// import { QuestionModel } from './question.model';
//
// describe('Question Model:', () => {
//     let questionModel: QuestionModel;
//     const mock = stripAnswers(controlCost);
//
//     beforeEach(() => {
//         questionModel = new QuestionModel(mock.questions[0] as any);
//     });
//
//     describe('.constructor()', () => {
//         it('Should be defined', () => {
//             expect(questionModel).toBeDefined();
//         });
//     });
//
//     describe('.answer', () => {
//         it('Should on Init return an empty answer: textarea', () => {
//             questionModel.answerType = 'textarea';
//             expect(questionModel.answer).toBe('');
//         });
//
//         it('Should on Init return an empty answer: range', () => {
//             questionModel.answerType = 'range';
//             expect(questionModel.answer).toBe(5);
//         });
//
//         it('Should on Init return an empty answer: none', () => {
//             questionModel.answerType = 'none';
//             expect(questionModel.answer).toBe('');
//         });
//
//         it('Should on Init return an empty answer: Box2', () => {
//             questionModel.answerType = 'box2';
//             expect(questionModel.answer.slice()).toEqual(['', '']);
//         });
//
//         it('Should on Init return an empty answer: Box0', () => {
//             questionModel.answerType = 'box0';
//             expect(questionModel.answer.slice()).toEqual(['']);
//         });
//
//         it('Should on null input, do nothing', () => {
//             questionModel.answer = null;
//             expect(questionModel.hasAnswer).toBeFalsy();
//             questionModel.answer = undefined;
//             expect(questionModel.hasAnswer).toBeFalsy();
//         });
//     });
//
//     // describe('.isOpen', () => {
//     //     it('Should on null input, do nothing', () => { // La prima domanda è impostata a true
//     //         questionModel.isOpen = null;
//     //         expect(questionModel.isOpen).toBeTruthy();
//     //         questionModel.isOpen = undefined;
//     //         expect(questionModel.isOpen).toBeTruthy();
//     //     });
//     // });
//
//     describe('.hasAnswer', () => {
//         it('Should be writable', () => {
//             questionModel.hasAnswer = false;
//             expect(questionModel.hasAnswer).toBeFalsy();
//         });
//     });
// });
