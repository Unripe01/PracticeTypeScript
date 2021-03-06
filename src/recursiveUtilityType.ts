// Mapped TypesとConditional Typesを併用すると
// 再帰的な型変換ができる。
namespace RecursiveUtilityTypes {
  // target type
  interface User {
    name: string;
    age: number;
    gender: "male" | "famele" | "other";
    birth: {
      day: Date;
      place?: {
        country?: string | null;
        state?: string;
      };
    };
  }

  // isPrimitive
  // Object または Array型可を判定する型
  // 該当しなければPrimitiveとみなす。
  // 再帰的な変換にこの型を利用する
  type Unbox<T> = T extends { [k: string]: infer U }
    ? U
    : T extends (infer U)[]
    ? U
    : T;
	// Unbox<T>で返される型。つまり プリミティブでなければ never
  type isPrimitive<T> = T extends Unbox<T> ? T : never;
  // type that = Unbox<string[]>;
  // type that2 = Unbox<{ k: string; l: 123 }>;
  // type that3 = Unbox<number>;
  // type arrType = isPrimitive<string[]>;


  // DeepReadOnly型
  // 再帰的にDeepReadOnlyにする。
  type DeepReadOnly<T> = {
    readonly [P in keyof T]: T[P] extends isPrimitive<T[P]>
      ? T[P]
      : DeepReadOnly<T[P]>;
  };
  type DeepReadOnlyWrapUser = DeepReadOnly<User>;

	// DeepNullable
  type DeepNullable<T> = {
    [P in keyof T]?: T[P] extends isPrimitive<T[P]>
      ? T[P] | null 
      : DeepReadOnly<T[P]>;
  };
	type DeepNullableWrapUser = DeepNullable<User>;

	//DeepNonNullable
  type DeepNonNullable<T> = {
    [P in keyof T]-?: T[P] extends isPrimitive<T[P]>
      ? Exclude<T[P], null | undefined>
      : DeepNonNullable<T[P]>;
  };
	type DeepNonNullableWrapUser = DeepNonNullable<User>;

}
