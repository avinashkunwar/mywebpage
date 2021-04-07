export interface AbilityInterface {
    legend: string;
    value: number;
};

export interface AbilityBlockInterface {
    title: string;
    itemsBlockLeft: Array<AbilityInterface>;
    itemsBlockRight: Array<AbilityInterface>;
}

export interface SubsectionsInterface {
    stack: {
        title: string;
    };
    skills: AbilityBlockInterface;
    languages: AbilityBlockInterface;
    tools: AbilityBlockInterface;
};

export interface AbilitiesInterface {
    title: string;
    description: string;
    subsections: SubsectionsInterface;
    note: string;
};