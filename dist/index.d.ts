interface ClassConstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
}
declare var RandomDefine: (initclass: ClassConstructor, extendsname: string) => string;
export default RandomDefine;
