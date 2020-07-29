interface ClockOptions {
    width?: number;
    height?: number;
    radius?: number;
    scaleSpacing?: number;
    hourScaleLength?: number;
    hourScaleColor?: string;
    secondScaleLength?: number;
    secondScaleColor?: string;
    handColor?: string;
    el?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
}

class Clock {
    options = {} as ClockOptions;

    minutes: number;

    seconds: number;

    hours: number;

    constructor(options: ClockOptions) {
        const defaultOptions = {
            width: 300,
            height: 300,
            radius: 100,
            scaleSpacing: 5,
            hourScaleLength: 15,
            hourScaleColor: '#fff',
            secondScaleLength: 10,
            secondScaleColor: '#536b7a',
            handColor: '#fff'
        };
        this.options = Object.assign(defaultOptions, options);
    }

    start(): void {
        window.requestAnimationFrame = (() => {
            /* eslint-disable */
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                // @ts-ignore
                window.mozRequestAnimationFrame || function (callback) {
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        callback();
                    }, 1000 / 60);
                }
            /* eslint-disable */
        })();
        window.requestAnimationFrame(this.init.bind(this));
    }

    init(): void {
        const {radius} = this.options;
        this.drawClockLayout();
        this.drawClockLayoutBorder();
        this.drawClockHourScale();
        // 当clock 半径大于50px时显示分刻度
        if (radius >= 50) {
            this.drawClockSecondScale();
        }
        this.getTimeDetail();
        this.drawClockHourHand();
        this.drawClockMinuteHand();
        this.drawClockSecondHand();
        window.requestAnimationFrame(this.init.bind(this));
    }

    // 获取当前系统时分秒
    getTimeDetail(): void {
        const now = new Date();
        const hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        this.hours = hours > 12 ? hours - 12 : hours;
    }

    // 绘制圆盘
    drawClockLayout(): void {
        const {el, width, height, radius} = this.options;
        const ctx = el.getContext('2d');
        el.width = width;
        el.height = height;
        const linear = ctx.createLinearGradient(radius, 0, -radius, 0);
        linear.addColorStop(0, '#242f37');
        linear.addColorStop(1, '#48585c');
        ctx.fillStyle = linear;
        ctx.beginPath();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-Math.PI / 2); // 将坐标轴逆时针旋转90度，x轴正方向对准12点方向
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
        ctx.fill();
        this.options.ctx = ctx;
    }

    // 绘制圆盘边框
    drawClockLayoutBorder(): void {
        const {ctx, radius} = this.options;
        ctx.beginPath();
        ctx.lineWidth = radius / 20;
        const linear = ctx.createLinearGradient(radius, 0, -radius, 0);
        linear.addColorStop(0, '#adb9c5');
        linear.addColorStop(1, '#e9eced');
        ctx.strokeStyle = linear;
        ctx.arc(0, 0, radius + 2, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.save();
        this.options.ctx = ctx;
    }

    // 绘制小时刻度
    drawClockHourScale(): void {
        const {ctx, radius, scaleSpacing, hourScaleLength, hourScaleColor} = this.options;
        const hourScaleList = [...Array(12).keys()];
        hourScaleList.forEach(() => {
            ctx.beginPath();
            ctx.strokeStyle = hourScaleColor;
            ctx.lineWidth = 3;
            ctx.rotate(Math.PI / 6);
            ctx.moveTo(radius - scaleSpacing, 0);
            ctx.lineTo(radius - scaleSpacing - hourScaleLength, 0);
            ctx.stroke();
        });
        ctx.restore();
        ctx.save();
        this.options.ctx = ctx;
    }

    // 绘制分钟刻度
    drawClockSecondScale(): void {
        const {ctx, radius, secondScaleLength, scaleSpacing, secondScaleColor} = this.options;
        const secondScaleList = [...Array(60).keys()];
        secondScaleList.forEach(index => {
            if (index % 5 !== 0) {
                ctx.beginPath();
                ctx.strokeStyle = secondScaleColor;
                ctx.lineWidth = 2;
                ctx.moveTo(radius - scaleSpacing, 0);
                ctx.lineTo(radius - scaleSpacing - secondScaleLength, 0);
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        });
        ctx.restore();
        ctx.save();
        this.options.ctx = ctx;
    }

    // 绘制时针
    drawClockHourHand(): void {
        const {hours, minutes, seconds} = this;
        const {ctx, radius, handColor} = this.options;
        ctx.rotate(hours * (Math.PI / 6) + minutes * (Math.PI / 360) + seconds * (Math.PI / 21600));
        // 绘制时针
        ctx.lineWidth = radius / 15;
        ctx.strokeStyle = handColor;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * 0.73, 0);
        ctx.stroke();
        // 绘制时针顶端实心圆点
        ctx.fillStyle = '#34434c';
        ctx.arc(radius * 0.68, 0, radius / 50, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
        ctx.save();
        this.options.ctx = ctx;
    }

    // 绘制分针
    drawClockMinuteHand(): void {
        const {minutes, seconds} = this;
        const {ctx, radius, handColor} = this.options;
        const minuteHandLineWidth = radius / 25;
        ctx.rotate(minutes * (Math.PI / 30) + seconds * (Math.PI / 1800));
        // 绘制分针
        ctx.lineWidth = minuteHandLineWidth;
        ctx.strokeStyle = handColor;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * 0.9, 0);
        ctx.stroke();
        // 绘制时针顶端实心长条
        ctx.lineWidth = minuteHandLineWidth / 2;
        ctx.strokeStyle = '#34434c';
        ctx.beginPath();
        ctx.moveTo(radius * 0.87, 0);
        ctx.lineTo(radius * 0.77, 0);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        this.options.ctx = ctx;
    }

    // 绘制秒针
    drawClockSecondHand(): void {
        const {seconds} = this;
        const {ctx, radius, handColor} = this.options;
        const secondHandLineWidth = radius / 37.5;
        ctx.rotate(seconds * (Math.PI / 30));
        // 绘制秒针上端
        ctx.beginPath();
        ctx.lineWidth = secondHandLineWidth;
        ctx.strokeStyle = handColor;
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * 0.94, 0);
        ctx.stroke();
        // 绘制秒针底端
        ctx.beginPath();
        ctx.lineWidth = radius / 12.5;
        ctx.strokeStyle = handColor;
        ctx.moveTo(0, 0);
        ctx.lineTo(-radius * 0.25, 0);
        ctx.stroke();
        // 绘制秒针大圆环
        ctx.beginPath();
        ctx.fillStyle = handColor;
        ctx.arc(0, 0, radius * 0.1, 0, Math.PI * 2, true);
        ctx.fill();
        // 绘制小圆环
        ctx.beginPath();
        ctx.strokeStyle = '#cdd2d5';
        ctx.lineWidth = 1;
        ctx.arc(0, 0, radius / 18.75, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.restore();
    }
}

export default Clock;
