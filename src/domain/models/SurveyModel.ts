export type SurveyModel = {
    question: string;
    answers: Answer[];
};

type Answer = {
    image?: string;
    answer: string;
};
