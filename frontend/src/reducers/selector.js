export const combineAndSortArrByTime = (arr_1, arr_2) => {
    let result_arr = [];
    let [arr1,arr2] = [[...arr_1],[...arr_2]];
    while (arr1.length > 0 && arr2.length > 0) {
        if (new Date(arr1[0].createdAt) < new Date(arr2[0].createdAt)) {
            result_arr.push(arr1.shift())
        } else {
            result_arr.push(arr2.shift())
        }
    }
    result_arr = result_arr.concat(arr1, arr2);
    console.log(result_arr);
    return result_arr;
}

export const sortByNew = (arr) => (
    arr.sort(function(a,b) {
        if (a.createdAt < b.createdAt) {
            return 1
        } else {
            return -1;
        }
    })
)