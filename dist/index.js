const Reflect = window.Reflect;

const {apply: apply, construct: construct, defineProperty: defineProperty, deleteProperty: deleteProperty, get: get, getOwnPropertyDescriptor: getOwnPropertyDescriptor, getPrototypeOf: getPrototypeOf, has: has, isExtensible: isExtensible, ownKeys: ownKeys, preventExtensions: preventExtensions, set: set, setPrototypeOf: setPrototypeOf} = Reflect;

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isfunction(a) {
    return typeof a === "function";
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

if (!isobject(window.customElements)) {
    throw new TypeError(" customElements  not supported !");
}

function 使用value从表中查询key(表, 组件状态名) {
    return Object.entries(表).find(v => {
        return v[1] === 组件状态名;
    })[0];
}

window.CustomElementRegistry = get(getPrototypeOf(window.customElements), "constructor");

const {customElements: customElements, CustomElementRegistry: CustomElementRegistry} = window;

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

var RandomDefine = (initclass, extendsname) => RandomDefineCustomElement(initclass, extendsname);

function RandomDefineCustomElement(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        throw TypeError("invalid custom element class !");
    }
    if (!customElements[elementset].has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements.get(elementname)) {
            return RandomDefineCustomElement(initclass, extendsname, length + 1);
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
        return 使用value从表中查询key(customElements[elementmap], initclass);
    }
}

if (!customElements[elementset]) {
    customElements[elementset] = new Set;
}

if (!customElements[elementmap]) {
    customElements[elementmap] = {};
}

customElements.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        throw TypeError("invalid custom element class !");
    }
    if (!customElements[elementset].has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement(constructor, options ? options.extends : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements, name, constructor, options);
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    }
};

customElements[Symbol.iterator] = () => {
    const entries = Object.entries(customElements[elementmap]);
    return entries[Symbol.iterator].call(entries);
};

function getrandomcharactor() {
    return get(Array(26).fill(undefined).map((v, i) => 97 + i).map(n => String.fromCharCode(n)), Math.floor(Math.random() * 26));
}

function getrandomhexnumber() {
    return get(Array(16).fill(undefined).map((v, i) => i), Math.floor(Math.random() * 16)).toString(16);
}

function getrandomstringandnumber(length = 4) {
    return Array(length).fill(undefined).map(() => getrandomcharactor()).join("") + "-" + Array(length).fill(undefined).map(() => getrandomhexnumber()).join("");
}

export default RandomDefine;
//# sourceMappingURL=index.js.map
