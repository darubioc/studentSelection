export interface QuestAnswer {
        id: number;
        name: string;
        description: string;
    }

    export interface QuestQuestion {
        id: number;
        name: string;
        description: string;
        answers: QuestAnswer[];
    }

    export interface QuestCategory {
        id: number;
        name: string;
        questions: QuestQuestion[];
    }
