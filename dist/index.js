const Reflect = window.Reflect;

const {get: get, has: has, set: set} = Reflect;

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isfunction(a) {
    return typeof a === "function";
}

function isclassextendsHTMLElement(initclass) {
    return !!(isfunction(initclass) && initclass.prototype && initclass.prototype instanceof HTMLElement);
}

const invalid_custom_element_class = "invalid custom element class !";

if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError(" customElements  not supported !");
}

function 使用value从表中查询key(表, 组件状态名) {
    const outputentrie = Object.entries(表).find((v => v[1] === 组件状态名));
    return outputentrie ? outputentrie[0] : undefined;
}

window.CustomElementRegistry = Reflect.get(window.customElements, "constructor");

const elementset = Symbol.for("elementset");

const elementmap = Symbol.for("elementmap");

const {CustomElementRegistry: CustomElementRegistry} = window;

const customElements = window.customElements;

if (!has(customElements, elementset)) {
    set(customElements, elementset, new Set);
}

if (!has(customElements, elementmap)) {
    set(customElements, elementmap, Object.create(null));
}

var RandomDefine = (initclass, extendsname) => RandomDefineCustomElement(initclass, extendsname);

function RandomDefineCustomElement(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError("invalid custom element class !");
    }
    if (!get(customElements, elementset).has(initclass)) {
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
        return 使用value从表中查询key(get(customElements, elementmap), initclass);
    }
}

customElements.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError("invalid custom element class !");
    }
    if (!get(customElements, elementset).has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement(constructor, options ? options.extends : undefined);
        } else {
            CustomElementRegistry.prototype.define.call(customElements, name, constructor, options);
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    } else {
        CustomElementRegistry.prototype.define.call(customElements, name, constructor, options);
    }
};

set(customElements, Symbol.iterator, (() => {
    const entries = Object.entries(customElements[elementmap]);
    return entries[Symbol.iterator].call(entries);
}));

const charactorlist = Array(26).fill(undefined).map(((v, i) => 97 + i)).map((n => String.fromCharCode(n)));

const hexnumberlist = Array(16).fill(undefined).map(((v, i) => i)).map((a => a.toString(16)));

const charactorandnumberlist = [ ...new Set([ ...hexnumberlist, ...charactorlist ]) ];

function getrandomcharactor() {
    return get(charactorlist, Math.floor(Math.random() * charactorlist.length));
}

function getrandomhexnumberandcharactor() {
    return get(charactorandnumberlist, Math.floor(Math.random() * charactorandnumberlist.length));
}

function getrandomstringandnumber(length = 1) {
    return Array(length).fill(undefined).map((() => getrandomcharactor())).join("") + "-" + Array(length).fill(undefined).map((() => getrandomhexnumberandcharactor())).join("");
}

export { RandomDefine as default };
//# sourceMappingURL=index.js.map
