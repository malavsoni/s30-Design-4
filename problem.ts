class MyHeap {
  items: number[];
  comparator: (a: number, b: number) => number;

  constructor(comparator: (a: number, b: number) => number) {
    this.items = [];
    this.comparator = comparator;
  }

  size(): number {
    return this.items.length;
  }

  insert(item: number) {
    this.items.push(item);
    let index = this.items.length - 1;
    while (index > 0) {
      let parentIdx = this.parentIndexOf(index);
      let comparision = this.comparator(
        this.items[parentIdx],
        this.items[index]
      );
      if (comparision > 0) {
        this.swap(index, parentIdx);
        index = parentIdx;
      } else {
        break;
      }
    }
  }

  poll(): number | null {
    let result = this.items[0];
    this.swap(0, this.items.length - 1);
    this.items.pop();
    let index = 0;
    while (index < this.items.length) {
      let leftIdx = this.leftIndexOf(index);
      let rightIdx = this.rightIndexOf(index);
      let smallestValueAtIndex = leftIdx;
      if (
        rightIdx < this.items.length &&
        this.comparator(this.items[leftIdx], this.items[rightIdx]) > 0
      ) {
        smallestValueAtIndex = rightIdx;
      }
      if (
        smallestValueAtIndex < this.items.length &&
        this.comparator(this.items[index], this.items[smallestValueAtIndex]) > 0
      ) {
        this.swap(smallestValueAtIndex, index);
        index = smallestValueAtIndex;
      } else {
        break;
      }
    }
    return result;
  }

  private parentIndexOf(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  private leftIndexOf(index: number) {
    return index * 2 + 1;
  }
  private rightIndexOf(index: number) {
    return index * 2 + 2;
  }
  private swap(first: number, second: number) {
    let temp = this.items[first];
    this.items[first] = this.items[second];
    this.items[second] = temp;
  }
}

function kthSmallest(matrix: number[][], k: number): number {
  if (matrix.length == 1 && matrix[0].length == 1) {
    return matrix[0][0];
  }
  let heap = new MyHeap((a, b) => b - a);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      heap.insert(matrix[i][j]);
      if (heap.size() > k) {
        heap.poll();
      }
    }
  }

  return heap.poll()!;
}

describe("Compress String Iterator", () => {
  it("Happy Path", () => {
    expect(
      kthSmallest(
        [
          [1, 5, 9],
          [10, 11, 13],
          [12, 13, 15],
        ],
        8
      )
    ).toStrictEqual(13);
  });
  it("Happy Path", () => {
    expect(
      kthSmallest(
        [[-5]],
        1
      )
    ).toStrictEqual(-5);
  });
});
