type EnqueteType = "your_answer_1" | "your_answer_2"
type Answer = "a" | "b" | "c" | "d";
type User = {
  name: string;
  enquete1: { [k in EnqueteType]?: Answer | undefined};
  enquete2?: { [k : string]: Answer | undefined};
};

const userA: User = {
  name: "Taro",
  enquete1: {
    your_answer_1: "a",
  },
};

console.log(userA.enquete1['your_answer_1']);
console.log(userA.enquete1['your_answer_2']);



