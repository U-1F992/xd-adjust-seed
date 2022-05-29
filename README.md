# xd-adjust-seed

GC自動化用JavaScriptエンジン[Sunameri](https://github.com/mukai1011/Sunameri)のサンプル。

## Summary

ポケモンXDの初期seed厳選、および指定seedへの調整を行うプログラムです。

コントローラーと画像認識、.NETの外部ライブラリを利用した、高度な自動化をTypeScriptで記述しています。

ClearScript用の型定義の一部を含みます。（分離予定）

## Requirements

Tesseractに付属の`xdn.traineddata`が読み込まれている必要があります。[設定](src/config.ts)を参照してください。

```
> tesseract --list-langs
List of available languages in "C:\Program Files\Tesseract-OCR/tessdata/" (8):
eng
jpn
jpn_vert
osd
script/Japanese
script/Japanese_vert
xdn # これが必要
```

`Sunameri.exe`と同じディレクトリに`libraries`フォルダを作り、[XDDatabase.dll](https://github.com/mukai1011/XDDatabase)と[PokemonPRNG.dll](https://github.com/yatsuna827/PokemonPRNG)を配置してください。

## Usage

自動化に用いる操作は [src/sequences.ts](src/sequences.ts)、OCRなどの設定は[src/config.ts](src/config.ts)に集約されています。ハードウェアは[src/index.ts](src/index.ts)で宣言されます。

```ps1
npm install

# Compile
npx tsc

# Run
.\Sunameri.exe dist/index.js
```
