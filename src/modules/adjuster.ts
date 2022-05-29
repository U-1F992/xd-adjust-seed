import { waitTimeInfo } from "../config";
import { Finder } from "./finder";
import { sequences } from "../sequences";

export class Adjuster {

    private readonly controller: SerialPortWrapper;
    private readonly capture: VideoCaptureWrapper;
    private readonly finder: Finder;

    constructor(controller: SerialPortWrapper, capture: VideoCaptureWrapper) {
        this.controller = controller;
        this.capture = capture;
        this.finder = new Finder(this.controller, this.capture);
    }

    /**
     * seedを合わせる。
     * @param selectedResult 
     */
    adjustSeed(selectedResult: SelectedResult) {

        this.advanceByMoltres(selectedResult);
        const currentSeed = this.finder.getCurrentSeed();

        System.Console.WriteLine(JSON.stringify({ currentSeed: currentSeed.value }));

    }

    /**
     * いますぐバトルでファイヤーを戦闘に出し、高速消費する。
     * @param selectedResult 
     */
    private advanceByMoltres(selectedResult: SelectedResult) {

        // ファイヤーが出るまで再生成
        while (true) {
            let quickBattleData;
            try {
                quickBattleData = this.finder.getQuickBattle();
            } catch (error) {
                System.Console.Error.WriteLine((error as Error).message);
                quickBattleData = undefined;
            }

            if (typeof quickBattleData !== 'undefined') {
                if (quickBattleData.eIndex === 2) {
                    break;
                }
            }

            this.controller.execute(([] as Operation[]).concat(
                sequences.discardParties,
                sequences.loadParties
            ));
        }

        // 戦闘入って出る
        this.controller.execute(sequences.entryToBattle);
        const milliseconds = Math.floor(selectedResult.waitTime.Subtract(waitTimeInfo.minimum).TotalMilliseconds);
        new Timer().sleep(milliseconds);

        // 高速消費後1回分捨てる
        this.controller.execute(([] as Operation[]).concat(
            sequences.exitBattle,
            sequences.loadParties,
            sequences.discardParties
        ));
    }
}
