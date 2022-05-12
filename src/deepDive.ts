namespace DeepDive {
  interface DeepNest {
    deep: { nest: { value: string } };
  }
  interface ShallowNest {
    shallow: { value: string };
  }
  interface Properties {
    deep: DeepNest;
    shallow: ShallowNest;
  }

  // DeepDive
  // extends DeepNest によって DeepNest['deep']['nest']['value'] の推論が成り立つ。
  type Salvage<T extends DeepNest> = T['deep']['nest']['value']
  type DeepDive<T> = {
      [K in keyof T]: T[K] extends DeepNest ? Salvage<T[K]> : never
  }[keyof T]

  type X = DeepDive<Properties> //string 

}
