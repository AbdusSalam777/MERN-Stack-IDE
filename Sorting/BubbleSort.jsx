function bubbleSortDesc(arr) {

  let a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {

    for (let j = 0; j < a.length - i - 1; j++) {

      if (a[j].title.localeCompare(a[j + 1].title) < 0) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }

  return a;
}

export default bubbleSortDesc;
