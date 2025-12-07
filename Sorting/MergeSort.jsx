function mergeSortAsc(arr) {

  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortAsc(arr.slice(0, mid)); //left half
  const right = mergeSortAsc(arr.slice(mid));   //right half

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {

    if (left[i].title.localeCompare(right[j].title) <= 0) {
      result.push(left[i]);
      i++;
    } 
    else {
      result.push(right[j]);
      j++;
    }

  }

  return [...result, ...left.slice(i), ...right.slice(j)];

}

export default mergeSortAsc;