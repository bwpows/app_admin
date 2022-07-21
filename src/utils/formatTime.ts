class TimeFun {
    // public time: Date;
    constructor() {}

    public formatTime(time: Date, formatTime: string): string {
        return formatTime
        .replace("yyyy", this.lessTen(time.getFullYear()))
        .replace("MM", this.lessTen(time.getMonth() + 1))
        .replace("dd", this.lessTen(time.getDate()))
        .replace("HH", this.lessTen(time.getHours()))
        .replace("mm", this.lessTen(time.getMinutes()))
        .replace("ss", this.lessTen(time.getSeconds()))
    }

    public lessTen(num: number): string {
        return num < 10 ? '0' + num : num + ''
    }

}

let time = new TimeFun()

export default time

