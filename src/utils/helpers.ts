export function findMaxValue (arr: ((string | null)[] | undefined)) {
    let max = 0;
    if (arr) {
        for (let i = 0; i < arr?.length; i++) {
            let value = arr[i] ?? '0';
            if (parseFloat(value.replace(/[^0-9.-]+/g,"")) > max) {
                max = parseFloat(value.replace(/[^0-9.-]+/g,""));

            }
        }
    }
    return max;
}

export function findMinValue (arr: ((string | null)[] | undefined)) {
    let min = -1
    if (arr) {
        for (let i = 0; i < arr?.length; i++) {
            let value = arr[i] ?? '0';
            if (parseFloat(value.replace(/[^0-9.-]+/g,"")) < min || min === -1) {
                min = parseFloat(value.replace(/[^0-9.-]+/g,""));
            }
        }
    }
    return min;
}

