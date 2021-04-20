export type numberType = { id: string; val: number | undefined };
export type numbersStateType = Array<numberType>;
export type updateStateType = {
    status: boolean;
    id: string | undefined;
    val: number | undefined;
};
export type resultStateType = {
    media: number | undefined;
    mediana: Array<number> | undefined;
    desviacion: number | undefined;
};