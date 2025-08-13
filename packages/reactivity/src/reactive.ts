import { isObject } from "@vue/share";
const reactiveMap = new WeakMap();
enum ReactiveFlags{
    IS_REACTIVE="__v_isReactive"
}
export function reactive(target){
    return createReactiveObject(target)
}
function createReactiveObject(target){
    if(!isObject(target)){
        return target;
    }
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }
    const exitsProxy = reactiveMap.get(target);
    if(exitsProxy){
        return exitsProxy;
    }
    let proxy = new Proxy(target, mutableHandlers);
    reactiveMap.set(target,proxy);
    return proxy;
}
const mutableHandlers:ProxyHandler<any>={
    get(target, p, receiver) {
        if(p===ReactiveFlags.IS_REACTIVE){
            return true;
        }
    },
    set(target, p, newValue, receiver) {
        return  Reflect.set(target,p,newValue,receiver);
    },
}