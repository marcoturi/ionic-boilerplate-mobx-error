import { ExerciseModel } from './exercise.model';

const controlCost = {
    id: 1,
    type: 'acceptance',
    name: 'b',
    description: ' a',
    needValues: false,
    img: '',
    questions: [
        {
            id: 0,
            description: '1',
            answerType: 'textarea',
            toRemember: true,
            answer: '',
        },
        {
            id: 1,
            description: '2',
            answerType: 'textarea',
            toRemember: false,
            answer: '',
        },
        {
            id: 2,
            description: '3',
            answerType: 'textarea',
            toRemember: false,
            answer: '',
        },
    ],
};

describe('Exercise Model:', () => {
    let exerciseModel: ExerciseModel;

    beforeEach(() => {
        exerciseModel = new ExerciseModel(controlCost as any);
    });

    describe('.lastQuestionAnswered', () => {
        it('Should return 0 on init', () => {
            expect(exerciseModel.lastQuestionAnswered).toBe(0);
        });

        it('Should return 1 after first answer', () => {
            exerciseModel.questions[0].answer = 'prova';
            exerciseModel.questions[1].answer = 'prova';
            console.log(JSON.stringify(exerciseModel));
            expect(exerciseModel.questions[0].hasAnswer).toBeTruthy();
            expect(exerciseModel.lastQuestionAnswered).toBe(1);
        });
    });
});
