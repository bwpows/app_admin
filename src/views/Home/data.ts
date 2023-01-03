export type DashboardDto = {
    todayViewNums: number;

    todayAddWorkNums: number;

    todayAddTaskNums: number;

    todayAddUserNums: number;

    monthAddWorkList: TimeType[];

    monthAddTaskList: TimeType[];

    monthAddViewList: TimeType[];

    reviewStatus: boolean;
}

type TimeType = {
    name: string,
    taskValue: number,
    workValue: number,
    viewValue: number
}