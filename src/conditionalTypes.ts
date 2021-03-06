// Conditional Types
type IsStringTrue<T> = T extends string ? true : false;
type x = IsStringTrue<"test">; //true
type y = IsStringTrue<0>; //false

// Mapped Types での利用
namespace UsingMappedTypes {
  interface Properties {
    name: string;
    age: number;
    flag: boolean;
  }
  type IsType<T, U> = {
    [K in keyof T]: T[K] extends U ? true : false;
  };

  type IsString = IsType<Properties, string>;
  type IsNumber = IsType<Properties, number>;
  type IsBoolean = IsType<Properties, boolean>;
}

namespace UsingUnionTypes {
    interface Properties {
        name: string;
        age: number;
        walk : ()=> void
        jump : ()=> Promise<void>
      }
      type Filter<T, U> = {
        [K in keyof T]: T[K] extends U ? K : never;
      }[keyof T];
    
    type StringKeys = Filter<Properties, string>;
    type NumberKeys = Filter<Properties, number>;
    type FunctionKeys = Filter<Properties, Function>;
    type ReturnPromiseKeys = Filter<Properties, ()=> Promise<any>>;
}
