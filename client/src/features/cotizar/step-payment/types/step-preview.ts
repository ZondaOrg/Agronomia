export interface Step3PreviewRequest {
    idProvider: number;
    idProduct: number;
    idOptionals: number[];
}

export interface StepPreview {
    nameProvider: string;
    nameProduct: string;
    nameOptionals: string[];
}
