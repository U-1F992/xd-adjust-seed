declare var __dirname: string;
interface Operation {
    message: string;
    wait: number;
}
interface SerialPortConfig {
    portName: string;
    baudRate: number;
}
/**
 * Represents messages to press each button.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L47-L94
 */
declare const KeyDown = {
    /** Press A button. */
    A: 'a',
    /** Press B button. */
    B: 'b',
    /** Press X button. */
    X: 'c',
    /** Press Y button. */
    Y: 'd',
    /** Press L button. */
    L: 'e',
    /** Press R button. */
    R: 'f',
    /** Press Z button. */
    Z: 'g',
    /** Press Start button. */
    Start: 'h',
    /** Press Left button. */
    Left: 'i',
    /** Press Right button. */
    Right: 'j',
    /** Press Down button. */
    Down: 'k',
    /** Press Up button. */
    Up: 'l'
}
/**
 * Represents messages to release each button.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L95-L142
 */
declare const KeyUp = {
    /** Release A button. */
    A: 'm',
    /** Release B button. */
    B: 'n',
    /** Release X button. */
    X: 'o',
    /** Release Y button. */
    Y: 'p',
    /** Release L button. */
    L: 'q',
    /** Release R button. */
    R: 'r',
    /** Release Z button. */
    Z: 's',
    /** Release Start button. */
    Start: 't',
    /** Release Left button. */
    Left: 'u',
    /** Release Right button. */
    Right: 'v',
    /** Release Down button. */
    Down: 'w',
    /** Release Up button. */
    Up: 'x'
}
/**
 * Represents messages to tilt the x-axis of the Control Stick.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L143-L154
 */
declare const xAxis = {
    /** Tilt to the left. */
    _0: 'y',
    /** Return to its center. */
    _128: 'z',
    /** Tilt to the right. */
    _255: '1'
}
/**
 * Represents messages to tilt the y-axis of the Control Stick.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L155-L166
 */
declare const yAxis = {
    /** Tilt to the down. */
    _0: '2',
    /** Return to its center. */
    _128: '3',
    /** Tilt to the up. */
    _255: '4'
}
/**
 * Represents messages to tilt the x-axis of the C Stick.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L167-L178
 */
declare const cxAxis = {
    /** Tilt to the left. */
    _0: '5',
    /** Return to its center. */
    _128: '6',
    /** Tilt to the right. */
    _255: '7',
}
/**
 * Represents messages to tilt the y-axis of the C Stick.
 * https://github.com/mizuyoukanao/WHALE/blob/f8620dd746854babd635b8ed21e728afead16522/WHALE/WHALE.ino#L179-L190
 */
declare const cyAxis = {
    /** Tilt to the down. */
    _0: '8',
    /** Return to its center. */
    _128: '9',
    /** Tilt to the up. */
    _255: '0'
}
declare class SerialPortWrapper {
    constructor(config: SerialPortConfig);
    execute(sequence: Operation[]): void;
    Dispose(): void;
}
interface VideoCaptureConfig {
    index: number;
    width: number;
    height: number;
    visible: boolean;
}
declare class VideoCaptureWrapper {
    constructor(config: VideoCaptureConfig);
    getFrame(): Mat;
    setSizeToShow(rect: Size): void;
    Dispose(): void;
}
declare class Timer {
    sleep(millisecondsTimeout: number): void;
    start(): void;
    start(milliseconds: number): void;
    submit(milliseconds: number): void;
    wait(): void;
    stop(): void;
}
