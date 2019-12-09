// import RandomDefine from "@masx200/mvvm-reactive-view/src/CustomElementRegistry";
interface ClassConstructor {
  new (): HTMLElement;
  prototype: HTMLElement;
}
declare function RandomDefine(
  initclass: ClassConstructor,
  extendsname?: string
): string;
export default RandomDefine;
