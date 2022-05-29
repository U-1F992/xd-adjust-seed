export function toUInt32(value: number) {
    const result = newVar(System.UInt32) as System.UInt32;
    result.value = value;
    return result;
}
export function toUInt32Array(array: number[]) {
    if (array.filter(element => typeof element !== 'number').length !== 0) throw new Error('Array must contain only numbers.');
    const result = newArr(System.UInt32, array.length) as Array<System.UInt32>;
    array.forEach((value, index) => result[index] = toUInt32(value));
    return result;
}
