export interface IRootStore {
    count: number;
    aaa: string;
    snackbar: Object,
    isMobile: boolean,
    menuExpand?: boolean
}

export interface ISnackBar {
    show: boolean;
    message: string;
    color?: string;
    timeout?: number;
}