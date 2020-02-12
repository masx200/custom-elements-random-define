/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-empty-interface */
const Reflect = window.Reflect;
interface ClassConstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
}
const {
    get: get,
    getPrototypeOf: getPrototypeOf,
    has: has,
    set: set
} = Reflect;

function isobject(a: any) {
    return typeof a === "object" && a !== null;
}

function isfunction(a: any) {
    return typeof a === "function";
}

function isclassextendsHTMLElement(
    initclass: any
): initclass is ClassConstructor {
    return !!(
        isfunction(initclass) &&
        initclass.prototype &&
        initclass.prototype instanceof HTMLElement
    );
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError();
}

function 使用value从表中查询key(
    表: { [s: string]: ClassConstructor },
    组件状态名: ClassConstructor
) {
    const outputentrie = Object.entries(表).find(v => {
        return v[1] === 组件状态名;
    });
    return outputentrie ? outputentrie[0] : undefined;
}

window.CustomElementRegistry = get(
    getPrototypeOf(window.customElements),
    "constructor"
);

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

const { CustomElementRegistry: CustomElementRegistry } = window;

const customElements: customElementsclass = window.customElements as customElementsclass;
interface customElementsclass extends CustomElementRegistry {
    [elementmap]: Record<string, ClassConstructor>;
    [elementset]: Set<ClassConstructor>;
}
if (!has(customElements, elementset)) {
    set(customElements, elementset, new Set());
}

if (!has(customElements, elementmap)) {
    set(customElements, elementmap, Object.create(null));
}

var RandomDefine = (initclass: ClassConstructor, extendsname: string) =>
    RandomDefineCustomElement(initclass, extendsname);

function RandomDefineCustomElement(
    initclass: ClassConstructor,
    extendsname?: string,
    length = 1
): string {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements.get(elementname)) {
            return RandomDefineCustomElement(
                initclass,
                extendsname,
                length + 1
            );
        } else {
            if (extendsname) {
                customElements.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements.define(elementname, initclass);
            }
        }
        return elementname;
    } else {
        return 使用value从表中查询key(
            get(customElements, elementmap),
            initclass
        ) as string;
    }
}
interface CustomElementConstructor {
    new (): HTMLElement;
}
customElements.define = function(
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement(
                constructor,
                options ? options.extends : undefined
            );
        } else {
            CustomElementRegistry.prototype.define.call(
                customElements,
                name,
                constructor,
                options
            );
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    }
};

set(customElements, Symbol.iterator, () => {
    const entries = Object.entries(customElements[elementmap]);
    return entries[Symbol.iterator].call(entries);
});

const charactorlist = Array(26)
    .fill(undefined)
    .map((v, i) => 97 + i)
    .map(n => String.fromCharCode(n));

const hexnumberlist = Array(16)
    .fill(undefined)
    .map((v, i) => i)
    .map(a => a.toString(16));

const charactorandnumberlist = [
    ...new Set([...hexnumberlist, ...charactorlist])
];

function getrandomcharactor() {
    return get(charactorlist, Math.floor(Math.random() * charactorlist.length));
}

function getrandomhexnumberandcharactor() {
    return get(
        charactorandnumberlist,
        Math.floor(Math.random() * charactorandnumberlist.length)
    );
}

function getrandomstringandnumber(length = 1) {
    return (
        Array(length)
            .fill(undefined)
            .map(() => getrandomcharactor())
            .join("") +
        "-" +
        Array(length)
            .fill(undefined)
            .map(() => getrandomhexnumberandcharactor())
            .join("")
    );
}

export default RandomDefine;
//# sourceMappingURL=index.js.map
