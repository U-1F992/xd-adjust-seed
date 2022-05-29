import { advanceInfo, waitTimeInfo } from "../config";
import { Finder } from "./finder";
import { toUInt32 } from "./interop";
import { sequences } from "../sequences";

export class Selector {

    private readonly controller: SerialPortWrapper;
    private readonly capture: VideoCaptureWrapper;
    private readonly finder: Finder;

    constructor(controller: SerialPortWrapper, capture: VideoCaptureWrapper) {
        this.controller = controller;
        this.capture = capture;
        this.finder = new Finder(this.controller, this.capture);
    }

    selectSeed(targetSeeds: number[]): SelectedResult {

        let currentSeed: System.UInt32 = toUInt32(0x0);

        do {
            // 1回目捨てまで
            this.controller.execute(([] as Operation[]).concat(
                sequences.reset,
                sequences.moveQuickBattle,
                sequences.loadParties,
                sequences.discardParties
            ));

            // getCurrentSeedが失敗したらリセット
            // = 5回連続でgetQuickBattleDataが失敗
            let flag = false;
            try {
                currentSeed = this.finder.getCurrentSeed();
            } catch (error) {
                System.Console.Error.WriteLine((error as Error).message);
                flag = true;
            }
            if (flag) {
                continue;
            }

            for (let i = 0; i < targetSeeds.length; i++) {

                const targetSeed = toUInt32(targetSeeds[i]);
                const waitTime = getWaitTime(currentSeed, targetSeed);
    
                if (isCloseEnough(waitTime)) {
                    return {
                        pivotSeed: currentSeed,
                        targetSeed: targetSeed,
                        waitTime: waitTime
                    };
                }
            }
        } while (true);
    }
}

/**
 * advanceInfoに基づいてseed間の待機時間を算出する
 */
function getWaitTime(currentSeed: System.UInt32, targetSeed: System.UInt32) {
    return System.TimeSpan.FromSeconds(GCLCGExtension.GetIndex(targetSeed, currentSeed) as any / advanceInfo.faster.perSecond);
}

/**
 * waitTimeがminimum以上maximum以下
 */
function isCloseEnough(waitTime: System.TimeSpan) {

    // C#側の演算子のオーバーロードはClearScript側から利用できない
    const longerThanMinimum = waitTime.CompareTo(waitTimeInfo.minimum) >= 0;
    const shorterThanMaximum = waitTime.CompareTo(waitTimeInfo.maximum) <= 0;
    
    return longerThanMinimum && shorterThanMaximum;
}
