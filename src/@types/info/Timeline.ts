export interface CardDialogImageInterface {
    caption: string;
    image: string;
};

export interface CardDialogInfoInterface {
    infoTitle: string;
    infoItems: Array<string>;
}

export interface CardDialogContentInterface {
    carousel: Array<CardDialogImageInterface>;
    infoList?: Array<CardDialogInfoInterface>;
};

export interface CardDataInterface {
    title: string;
    date: string;
    role: string;
    description: string;
    descriptionSecondPart?: string;
    projectLink?: string;
    image: string;
    cardDialogContent: CardDialogContentInterface;
};

export interface TimelineInterface {
    title: string;
    subtitle: string;
    caption: string;
    cards: Array<CardDataInterface>;
};