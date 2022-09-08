export interface IRootStore {
    count: number;
    aaa: string;
    snackbar: Object
}

export interface ISnackBar {
    show: boolean;
    message: string;
    color?: string;
    timeout?: number;
}