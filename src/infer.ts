namespace infer {
  // infer U の部分を string ,number などと置き換えて読めば良い

  // ReturnType型の再現
  function greet() {
    return "Hello!";
  }
  type Return<T> = T extends (...any: any[]) => infer U ? U : never;
  type R = Return<typeof greet>;

  // 引数型の抽出
  function greet2(name: string, age: number) {
    return `hello ${name} ,I'm ${age} years old.`;
  }

  type A1<T> = T extends (...arg: [infer U, ...any[]]) => any ? U : never;
  type A2<T> = T extends (...arg: [any, infer U, ...any[]]) => any ? U : never;
  type A3<T> = T extends (...arg: infer U) => any ? U : never; //これはtupleで返す。

  type x = A1<typeof greet2>; //string
  type y = A2<typeof greet2>; //number
  type z = A3<typeof greet2>; //[name: string, age: number]

  //promiseの戻り値
  async function greet3() {
    return "hello";
  }

  type ResolveArg<T> = T extends () => Promise<infer U> ? U : never;
  type pa1 = typeof greet3; // type pa1 = () => Promise<string>
  type pa2 = ResolveArg<typeof greet3>; // type pa2 = string
}
