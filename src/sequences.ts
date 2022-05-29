/**
 * 自動化に使用する各種動作を定義する
 */
export const sequences = {
    /**
     * B+X+Stでソフトリセットし、「つづきをあそぶ」まで
     */
    reset: [
        { message: KeyDown.B, wait: 50 },
        { message: KeyDown.X, wait: 50 },
        { message: KeyDown.Start, wait: 1000 },
        { message: KeyUp.Start, wait: 50 },
        { message: KeyUp.X, wait: 50 },
        { message: KeyUp.B, wait: 10000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 20000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2500 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1000 }
    ] as Operation[],
    /**
     * 「つづきをあそぶ」-> いますぐバトル「さいきょう」まで
     */
    moveQuickBattle: [
        { message: xAxis._255, wait: 100 },
        { message: xAxis._128, wait: 800 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1500 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1500 }
    ] as Operation[],
    /**
     * 「さいきょう」を選択し手持ちを生成
     */
    loadParties: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1500 }
    ] as Operation[],
    /**
     * いますぐバトルのパーティが表示されている画面から、B押して破棄
     */
    discardParties: [
        { message: KeyDown.B, wait: 300 },
        { message: KeyUp.B, wait: 1500 }
    ] as Operation[],
    /**
     * いますぐバトルのパーティが表示されている画面から、「はい」を押して戦闘が開始し、操作可能になるまで待機
     */
    entryToBattle: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 7000 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 4000 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 26000 }
    ] as Operation[],
    /**
     * 戦闘を降参で離脱
     */
    exitBattle: [
        { message: KeyDown.Start, wait: 100 },
        { message: KeyUp.Start, wait: 500 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 500 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 12000 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 4000 }
    ] as Operation[],
    /**
     * いますぐバトル「さいきょう」->「つづきをあそぶ」まで
     */
    moveMenu: [
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 800 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 1500 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 2000 },
        { message: xAxis._0, wait: 100 },
        { message: xAxis._128, wait: 1000 }
    ] as Operation[],
    /**
     * 「つづきをあそぶ」->「せってい」
     */
    moveOptions: [
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 1000 }
    ] as Operation[],
    /**
     * 「せってい」-> 振動onにして「せってい」まで
     */
    enableVibration: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1500 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: xAxis._0, wait: 100 },
        { message: xAxis._128, wait: 300 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 500 },
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 8000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2000 }
    ] as Operation[],
    /**
     * 「せってい」-> 振動offにして「せってい」まで
     */
    disableVibration: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1500 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: xAxis._255, wait: 100 },
        { message: xAxis._128, wait: 300 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 500 },
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 300 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 8000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2000 }
    ] as Operation[],
    /**
     * 「せってい」->「つづきをあそぶ」
     */
    moveContinue: [
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 2000 }
    ] as Operation[],
    /**
     * 「つづきをあそぶ」-> ロードを待ってメニューを開く
     */
    load: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2000 },
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 500 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 6000 },
        { message: KeyDown.X, wait: 100 },
        { message: KeyUp.X, wait: 1000 }
    ] as Operation[],
    /**
     * 「ポケモン」->「レポート」
     */
    moveSave: [
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 100 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 100 },
        { message: yAxis._0, wait: 100 },
        { message: yAxis._128, wait: 1000 }
    ] as Operation[],
    /**
     * レポートを書いて、「レポート」に戻るまで
     */
    save: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1000 },
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 100 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 10000 },
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 1000 }
    ] as Operation[],
    /**
     * 「レポート」->「もちもの」
     */
    moveItems: [
        { message: yAxis._255, wait: 100 },
        { message: yAxis._128, wait: 1000 }
    ] as Operation[],
    /**
     * 持ち物を開いて閉じる
     */
    openCloseItems: [
        { message: KeyDown.A, wait: 100 },
        { message: KeyUp.A, wait: 2000 },
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 2500 }
    ] as Operation[],
    /**
     * メニューを閉じて主人公の腰振りを見て、再度メニューを開く
     */
    watchSteps: [
        { message: KeyDown.B, wait: 100 },
        { message: KeyUp.B, wait: 13000 },
        { message: KeyDown.X, wait: 100 },
        { message: KeyUp.X, wait: 1000 }
    ] as Operation[],
    /**
     * seedが調整されてプログラムが終了する状態から行う、任意の動作を定義できます。
     */
    finalize: [] as Operation[]
}
