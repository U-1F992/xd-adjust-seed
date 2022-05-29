import { detectInfo, tessConfig, trainerInfo } from "../config";
import { toUInt32, toUInt32Array } from "./interop";
import { sequences } from "../sequences";

export class Finder {

    private readonly controller: SerialPortWrapper;
    private readonly capture: VideoCaptureWrapper;

    constructor(controller: SerialPortWrapper, capture: VideoCaptureWrapper) {
        this.controller = controller;
        this.capture = capture;
    }

    /**
     * いますぐバトル「さいきょう」にカーソルが合った状態から、seedを求めて返す。  
     * 「はい」にカーソルが合った状態で終了する。
     * @param controller 
     * @param capture 
     * @returns 
     */
    getCurrentSeed() {

        let result: List<System.UInt32>;
        let count = 0;
        this.controller.execute(sequences.loadParties);
    
        let data1
        try {
            data1 = this.getQuickBattle();
        } catch (error) {
            System.Console.Error.WriteLine((error as Error).message);
            count++;
    
            data1 = undefined;
        }
        
        do {
            this.controller.execute(([] as Operation[]).concat(
                sequences.discardParties,
                sequences.loadParties
            ));
    
            let data2;
            try {
                data2 = this.getQuickBattle();
                count = 0;
            } catch (error) {
                // 5回連続で失敗したらthrow
                System.Console.Error.WriteLine((error as Error).message);
                count++;
                if (count === 5) {
                    throw new Error(`getQuickBattleData failed ${count} times in a row.`);
                }
    
                data2 = undefined;
            }
    
            if (typeof data1 !== 'undefined' && typeof data2 !== 'undefined') {
                result = XDDatabase.SearchSeed(
                    data1.pIndex, data1.eIndex, toUInt32Array(data1.hp),
                    data2.pIndex, data2.eIndex, toUInt32Array(data2.hp),
                    toUInt32(trainerInfo.tsv)
                );
                if (result.Count === 1)
                    break;
            }
            data1 = data2;
    
        } while (true);
    
        // なぜかインデックスで値を見るとnumberが返ってくるんだよな...
        return toUInt32(result[0] as unknown as number);
    }

    /**
     * 画像からいますぐバトルの情報を返す。
     * @returns 
     */
    getQuickBattle() {

        const mat = this.capture.getFrame(); 

        const mat_pIndex = mat.Clone(detectInfo.player.icon.rect);
        const mat_eIndex = mat.Clone(detectInfo.com.icon.rect);
        const mat_hp_0 = mat.Clone(detectInfo.player.hp[0]);
        const mat_hp_1 = mat.Clone(detectInfo.player.hp[1]);
        const mat_hp_2 = mat.Clone(detectInfo.com.hp[0]);
        const mat_hp_3 = mat.Clone(detectInfo.com.hp[1]);
    
        const pIndex = detectInfo.player.icon.template.findIndex(value => mat_pIndex.Contains(value));
        const eIndex = detectInfo.com.icon.template.findIndex(value => mat_eIndex.Contains(value));
        const hp_0 = parseInt(mat_hp_0.GetOCRResult(tessConfig), 10);
        const hp_1 = parseInt(mat_hp_1.GetOCRResult(tessConfig), 10);
        const hp_2 = parseInt(mat_hp_2.GetOCRResult(tessConfig), 10);
        const hp_3 = parseInt(mat_hp_3.GetOCRResult(tessConfig), 10);
    
        // const fileName = `${Date.now().toString()}`;
        // mat.SaveImage(`${fileName}.png`);
        // mat_pIndex.SaveImage(`${fileName}-pIndex_${pIndex}.png`);
        // mat_eIndex.SaveImage(`${fileName}-eIndex_${eIndex}.png`);
        // mat_hp_0.SaveImage(`${fileName}-hp_0_${hp_0}.png`);
        // mat_hp_1.SaveImage(`${fileName}-hp_1_${hp_1}.png`);
        // mat_hp_2.SaveImage(`${fileName}-hp_2_${hp_2}.png`);
        // mat_hp_3.SaveImage(`${fileName}-hp_3_${hp_3}.png`);
    
        if (pIndex === -1 || eIndex === -1) {
            throw new Error("getQuickBattleData failed");
        }
    
        mat_pIndex.Dispose();
        mat_eIndex.Dispose();
        mat_hp_0.Dispose();
        mat_hp_1.Dispose();
        mat_hp_2.Dispose();
        mat_hp_3.Dispose();
        mat.Dispose();
    
        // HPは相手側から
        const hp = [hp_2, hp_3, hp_0, hp_1];
        const result = {
            pIndex: pIndex,
            eIndex: eIndex,
            hp: hp
        };
        System.Console.WriteLine(JSON.stringify(result));
        return result;
    }
}