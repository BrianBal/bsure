export enum BSureType {
    CUSTOM = "CUSTOM",
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    ARRAY = "ARRAY",
    OBJECT = "OBJECT",
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    URL = "URL",
    DATE = "DATE",
}

export type BSureOptions = {
    max?: number
    min?: number
    convert?: boolean
    validator?: (value: any) => boolean
}

export type BSureResult<T> = {
    isValid: boolean
    cleanValue?: T
    error?: string
}

const bsure = <T>(value: any, type: BSureType, opt?: BSureOptions): BSureResult<T> => {
    let isValid = true
    let cleanValue: any = undefined
    let error: string | undefined = undefined

    let options = opt || {}
    try {
        switch (type) {
            case BSureType.STRING:
                cleanValue = validateString(value, options)
                break
            case BSureType.NUMBER:
                cleanValue = validateNumber(value, options)
                break
            case BSureType.BOOLEAN:
                cleanValue = validateBoolean(value, options)
                break
            case BSureType.ARRAY:
                cleanValue = validateArray(value, options)
                break
            case BSureType.OBJECT:
                cleanValue = validateObject(value, options)
                break
            case BSureType.EMAIL:
                cleanValue = validateEmail(value, options)
                break
            case BSureType.PHONE:
                cleanValue = validatePhone(value, options)
                break
            case BSureType.URL:
                cleanValue = validateUrl(value, options)
                break
            case BSureType.DATE:
                cleanValue = validateDate(value, options)
                break
            default:
                break
        }
    } catch (e: any) {
        isValid = false
        error = e.message
    }

    let result: BSureResult<T> = {
        isValid,
        error,
        cleanValue: cleanValue as T,
    }
    return result
}

export default bsure

const validateString = (value: any, opt: BSureOptions): string => {
    let cleanValue = value
    if (typeof cleanValue !== "string") {
        if (opt.convert) {
            try {
                if (cleanValue instanceof Date) {
                    cleanValue = cleanValue.toISOString()
                } else {
                    cleanValue = cleanValue.toString()
                }
                if (cleanValue === "[object Object]") {
                    throw new Error("not a string")
                }
            } catch (e: any) {
                throw new Error("not a string")
            }
        } else {
            throw new Error("not a string")
        }
    }
    cleanValue = cleanValue.trim()

    if (opt.max && cleanValue.length > opt.max) {
        throw new Error(`too long`)
    }
    if (opt.min && cleanValue.length < opt.min) {
        throw new Error(`too short`)
    }
    return cleanValue
}

const validateNumber = (value: any, opt: BSureOptions): number => {
    let cleanValue = value
    if (typeof value !== "number" || isNaN(value)) {
        if (opt.convert) {
            try {
                let type = typeof value
                if (type === "string") {
                    cleanValue = parseFloat(value)
                } else if (type === "boolean") {
                    cleanValue = cleanValue ? 1 : 0
                } else if (cleanValue instanceof Date) {
                    cleanValue = cleanValue.getTime()
                } else {
                    throw new Error("not a number")
                }
            } catch (e) {
                throw new Error("not a number")
            }
            if (cleanValue === null || cleanValue === undefined || isNaN(cleanValue)) {
                throw new Error("not a number")
            }
        } else {
            throw new Error("not a number")
        }
    }
    if (opt.max && cleanValue > opt.max) {
        throw new Error(`too big`)
    }
    if (opt.min && cleanValue < opt.min) {
        throw new Error(`too small`)
    }
    return cleanValue
}

const validateBoolean = (value: any, opt: BSureOptions): boolean => {
    let cleanValue = value
    if (typeof value !== "boolean") {
        if (opt.convert) {
            try {
                cleanValue = parseBool(value)
            } catch (e) {
                throw new Error("not a boolean")
            }
        } else {
            throw new Error("not a boolean")
        }
    }

    return cleanValue
}

const validateArray = (value: any, opt: BSureOptions): any[] => {
    if (!Array.isArray(value)) {
        throw new Error("not an array")
    }
    if (opt.max && value.length > opt.max) {
        throw new Error(`too long`)
    }
    if (opt.min && value.length < opt.min) {
        throw new Error(`too short`)
    }
    return value
}

const validateObject = (value: any, opt: BSureOptions): any => {
    if (typeof value !== "object" || value === null || value === undefined || Array.isArray(value)) {
        throw new Error("not an object")
    }

    return value
}

const validateEmail = (value: any, opt: BSureOptions): string => {
    let cleanValue: string | undefined = undefined

    try {
        cleanValue = validateString(value, {})
    } catch (e) {
        throw new Error("not an email")
    }
    if (!cleanValue.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        throw new Error("not an email")
    }
    return cleanValue
}

const validatePhone = (value: any, opt: BSureOptions): string => {
    let cleanValue: string | undefined = undefined

    try {
        cleanValue = validateString(value, {})
    } catch (e) {
        throw new Error("not a phone number")
    }

    // should start with +
    // should have at elast 10 digits
    // replace all none digits or + characters
    cleanValue = value.replaceAll(/[^\d+]/g, "")

    if ((cleanValue?.length ?? 0) < 10) {
        throw new Error("not a phone number")
    }
    if (!(cleanValue ?? "").startsWith("+")) {
        throw new Error("missing country code")
    }
    return cleanValue!
}

const validateUrl = (value: any, opt: BSureOptions): string => {
    let cleanValue: string | undefined = undefined

    try {
        cleanValue = validateString(value, {})
    } catch (e) {
        throw new Error("not a url")
    }

    if (!cleanValue.match(/^https?:\/\/.+\..+$/)) {
        throw new Error("not a url")
    }

    return cleanValue
}

const validateDate = (value: any, opt: BSureOptions): Date => {
    if (value instanceof Date === false) {
        throw new Error("not a date")
    }
    if (opt.max) {
        let d = value as Date
        if (d.getTime() > opt.max) {
            throw new Error("too late")
        }
    }
    if (opt.min) {
        let d = value as Date
        if (d.getTime() < opt.min) {
            throw new Error("too early")
        }
    }
    return value
}

function parseBool(value: any): boolean {
    if (typeof value === "boolean") {
        return value
    }

    if (typeof value === "number") {
        return value !== 0
    }

    if (typeof value === "string") {
        const normalizedValue = value.toLowerCase().trim()
        switch (normalizedValue) {
            case "true":
            case "yes":
            case "y":
            case "1":
            case "on":
            case "enable":
            case "active":
            case "ok":
                return true
            case "false":
            case "no":
            case "n":
            case "0":
            case "off":
            case "disable":
            case "inactive":
                return false
            default:
                throw new Error(`Invalid string for parsing boolean: ${value}`)
        }
    }

    throw new Error(`Cannot parse boolean from value: ${value}`)
}
