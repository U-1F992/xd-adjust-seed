declare namespace System {
    class Console {
        static WriteLine(value?: string): void;
        
        static Error: {
            WriteLine(value?: string): void;
        }
    }
    class UInt32 {
        value: number;
    }
    /**
     * https://docs.microsoft.com/ja-jp/dotnet/api/system.timespan?view=net-6.0
     */
    class TimeSpan {
        TotalMilliseconds: number;
        Subtract(ts: TimeSpan): TimeSpan;
        ToString(): string;
        CompareTo(value: TimeSpan): number;
        static FromSeconds(value: number): TimeSpan;
        static Parse(s: string): TimeSpan;
    }
}
declare function newVar(type: any): unknown;
declare function newArr(type: any, size: number): unknown;
declare class Stream { }

declare interface List<T> {
    [index: number]: T;
    Count: number;
}
