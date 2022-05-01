namespace typeGuard {
  type User = { name: string };
  type UserA = User & { gender: "male" | "female" };
  type UserB = User & { age: number };

  const users: (UserA | UserB)[] = [
    { name: "taro", gender: "male" },
    { name: "taro", gender: "male", age: 18 },
  ];

  //fillter では型の絞り込みができない。
  const user1 = users.filter((user) => "age" in user);
  //---> const user: (UserA | UserB)[]

  //ユーザー定義Guardで実行
  function fillterUser(user: UserA | UserB): user is UserB {
    return "age" in user;
  }
  const user2 = users.filter(fillterUser);
  //---> const user2: UserB[]

  const user3 = users.filter(
    (user: UserA | UserB): user is UserB => "age" in user
  );
  //---> const user3: UserB[]
}
