// Filename: uriSerialized.js
const Util = {
    isArray: function (val: any) {
        return Object.prototype.toString.call(val) === "[object Array]"
    },
    isNil: function (val: null) {
        return val === null || Util.typeOf(val, null)
    },
    typeOf: function (val: any, type: any) {
        return (type || "undefined") === typeof val
    },
    funEach: function (obj: any, fun: { call: (arg0: null, arg1: any, arg2: string | number, arg3: any) => void }) {
        if (Util.isNil(obj)) return // empty value

        if (!Util.typeOf(obj, "object")) obj = [obj] // Convert to array

        if (Util.isArray(obj)) {
            // Iterate over array
            for (var i = 0, l = obj.length; i < l; i++)
                fun.call(null, obj[i], i, obj)
        } else {
            // Iterate over object
            for (var key in obj)
                Object.prototype.hasOwnProperty.call(obj, key) &&
                    fun.call(null, obj[key], key, obj)
        }
    },
}

export const uriSerialized = (params: any): string => {
    let pair: string[] = []

    const encodeValue = (v: string | number | boolean): string => {
        if (Util.typeOf(v, "object")) v = JSON.stringify(v)

        return encodeURIComponent(v)
    }

    Util.funEach(params, (val: any, key: string) => {
        let isNil = Util.isNil(val)

        if (!isNil && Util.isArray(val)) key = `${key}[]`
        else val = [val]

        Util.funEach(val, (v: any) => {
            pair.push(`${key}=${isNil ? "" : encodeValue(v)}`)
        })
    })

    return pair.join("&")
}