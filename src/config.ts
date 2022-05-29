export const tessConfig: TesseractConfig = {
    datapath: 'C:\\Program Files\\Tesseract-OCR\\tessdata\\',
    language: 'xdn',
    charWhitelist: '0123456789',
    oem: 3,
    psmode: 7,
}

export const detectInfo = {
    player: {
        /** プレイヤー側上のポケモンのアイコン */
        icon: {
            /** 位置 */
            rect: { x: 180, y: 670, width: 130, height: 130 },
            /** 判定に用いるテンプレート */
            template: [
                new Mat(`${__dirname}/player/0.png`),
                new Mat(`${__dirname}/player/1.png`),
                new Mat(`${__dirname}/player/2.png`),
                new Mat(`${__dirname}/player/3.png`),
                new Mat(`${__dirname}/player/4.png`)
            ]
        },
        /** プレイヤー側のHP位置 */
        hp: [
            { x: 415, y: 760, width: 130, height: 60 },
            { x: 415, y: 995, width: 130, height: 60 }
        ]
    },
    com: {
        /** COM側上のポケモンのアイコン */
        icon: {
            /** 位置 */
            rect: { x: 860, y: 670, width: 130, height: 130 },
            /** 判定に用いるテンプレート */
            template: [
                new Mat(`${__dirname}/com/0.png`),
                new Mat(`${__dirname}/com/1.png`),
                new Mat(`${__dirname}/com/2.png`),
                new Mat(`${__dirname}/com/3.png`),
                new Mat(`${__dirname}/com/4.png`)
            ]
        },
        /** COM側のHP位置 */
        hp: [
            { x: 1095, y: 760, width: 130, height: 60 },
            { x: 1095, y: 995, width: 130, height: 60 }
        ]
    }
}

export const advanceInfo = {
    /** 高速消費 */
    faster: {
        /**
         * 消費速度 (消費/s)  
         * 「いますぐバトル」でファイヤーを見る場合: 約3842消費/s
         */
        perSecond: 3842
    }//,
    /**
     * ロード後の消費  
     * ロードさせない場合は定義しない
     */
    // afterLoad: {
    //     /** ロードにかかる消費 (オブジェクトの読み込みなど？) */
    //     byLoading: number,
    //     /** 「もちもの」消費 */
    //     byOpeningItems: number
    // }
}

export const waitTimeInfo = {
    maximum: System.TimeSpan.Parse("0.03:00:00"),
    minimum: System.TimeSpan.Parse("0.00:02:00")
}

export const trainerInfo = {
    tsv: 0x10000
}
