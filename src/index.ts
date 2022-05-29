import { Adjuster } from "./modules/adjuster";
import { Selector } from "./modules/selector";
import { sequences } from "./sequences";

////////////////////////////////////////////////////////////////////////////////
//
// Sunameri JavaScript/TypeScript の基本機能を説明します。
//

// ポート名とボーレートを指定して、WHALEが書き込まれたデバイスと接続します。
const controller = new SerialPortWrapper({
    portName: 'COM3',
    baudRate: 4800
});
// カメラ番号とサイズ、画面表示の有無を指定してキャプチャーボードと接続します。
const capture = new VideoCaptureWrapper({
    index: 1,
    width: 1600,
    height: 1200,
    visible: true
});
// Timerは待機を担います。
// 指定時間待機するsleepのほか、タイマーの開始(start)後に終了時刻を設定(submit)して待機する(wait)こともできます。
const timer = new Timer();
timer.sleep(2000);

////////////////////////////////////////////////////////////////////////////////

const targetSeeds = [
    0x0,
    0xbadface,
    0xdeadbeef,
    0xFFFFFFFF
];

// 振動設定を有効にします。
controller.execute(([] as Operation[]).concat(
    sequences.reset,
    sequences.moveOptions,
    sequences.enableVibration
));

// 初期seedを厳選します。
const result = new Selector(controller, capture).selectSeed(targetSeeds);
System.Console.WriteLine(JSON.stringify({pivotSeed: result.pivotSeed.value, targetSeed: result.targetSeed.value, waitTime: result.waitTime.ToString()}));

// seedを目標seedまで合わせます。
// ファイヤーと戦闘して再特定まで実装済み
new Adjuster(controller, capture).adjustSeed(result);

timer.sleep(2000);
capture.Dispose();
controller.Dispose();
