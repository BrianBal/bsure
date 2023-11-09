import { expect, test } from "bun:test"
import bsure, { BSureType } from "./"

test("bsure.string", () => {
    let res: any

    res = bsure(null, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure(undefined, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure(NaN, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure({}, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure([], BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure(123, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure(123, BSureType.STRING)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")

    res = bsure("f", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too short")

    res = bsure("     ", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too short")

    res = bsure("123456", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too long")

    res = bsure("fff", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("fff")
    expect(res.error).toBe(undefined)

    res = bsure(" ffff", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("ffff")
    expect(res.error).toBe(undefined)

    res = bsure(" fffff", BSureType.STRING, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("fffff")
    expect(res.error).toBe(undefined)

    res = bsure(999, BSureType.STRING, { convert: true })
    expect(res.error).toBe(undefined)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("999")

    res = bsure(null, BSureType.STRING, { convert: true })
    expect(res.error).toBe("not a string")
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)

    res = bsure(undefined, BSureType.STRING, { convert: true })
    expect(res.error).toBe("not a string")
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)

    res = bsure(new Date(1383036360000), BSureType.STRING, { convert: true })
    expect(res.cleanValue).toBe("2013-10-29T08:46:00.000Z")
    expect(res.error).toBe(undefined)
    expect(res.isValid).toBe(true)

    res = bsure({ test: 123 }, BSureType.STRING, { convert: true })
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")
    expect(res.isValid).toBe(false)

    res = bsure([{ test: 123 }], BSureType.STRING, { convert: true })
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a string")
    expect(res.isValid).toBe(false)
})

test("bsure.number", () => {
    let res: any

    res = bsure(null, BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure(undefined, BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure(NaN, BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure({}, BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure([], BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure("123", BSureType.NUMBER)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a number")

    res = bsure(2, BSureType.NUMBER, { min: 3, max: 5 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too small")

    res = bsure(100, BSureType.NUMBER, { min: 3, max: 5 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too big")

    res = bsure(3, BSureType.NUMBER, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(3)
    expect(res.error).toBe(undefined)

    res = bsure(4, BSureType.NUMBER, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(4)
    expect(res.error).toBe(undefined)

    res = bsure(5, BSureType.NUMBER, { min: 3, max: 5 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(5)
    expect(res.error).toBe(undefined)

    res = bsure("999", BSureType.NUMBER, { convert: true })
    expect(res.cleanValue).toBe(999)
    expect(res.isValid).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure(false, BSureType.NUMBER, { convert: true })
    expect(res.cleanValue).toBe(0)
    expect(res.isValid).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure(new Date(1234), BSureType.NUMBER, { convert: true })
    expect(res.cleanValue).toBe(1234)
    expect(res.isValid).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure({}, BSureType.NUMBER, { convert: true })
    expect(res.cleanValue).toBe(undefined)
    expect(res.isValid).toBe(false)
    expect(res.error).toBe("not a number")

    res = bsure([], BSureType.NUMBER, { convert: true })
    expect(res.cleanValue).toBe(undefined)
    expect(res.isValid).toBe(false)
    expect(res.error).toBe("not a number")
})

test("bsure.boolean", () => {
    let res: any

    res = bsure(null, BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure(undefined, BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure(NaN, BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure({}, BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure([], BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure("123", BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure(12, BSureType.BOOLEAN)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure(true, BSureType.BOOLEAN)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure(false, BSureType.BOOLEAN)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(false)
    expect(res.error).toBe(undefined)

    res = bsure("false", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(false)
    expect(res.error).toBe(undefined)

    res = bsure("TRUE", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure("NO", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(false)
    expect(res.error).toBe(undefined)

    res = bsure("Y", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure("active", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(true)
    expect(res.error).toBe(undefined)

    res = bsure(0, BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe(false)
    expect(res.error).toBe(undefined)

    res = bsure("asdf", BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")

    res = bsure(new Date(), BSureType.BOOLEAN, { convert: true })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a boolean")
})

test("bsure.array", () => {
    let res: any

    res = bsure(null, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure(undefined, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure(NaN, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure({}, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure("123", BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure(12, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure(true, BSureType.ARRAY)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an array")

    res = bsure([], BSureType.ARRAY, { min: 1, max: 3 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too short")

    res = bsure([1, 2, 3, 4], BSureType.ARRAY, { min: 1, max: 3 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too long")

    res = bsure([1, 2, 3], BSureType.ARRAY, { min: 1, max: 3 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toEqual([1, 2, 3])
    expect(res.error).toBe(undefined)

    res = bsure([1, 2, 3], BSureType.ARRAY)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toEqual([1, 2, 3])
    expect(res.error).toBe(undefined)
})

test("bsure.object", () => {
    let res: any

    res = bsure(null, BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure(undefined, BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure(NaN, BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure([], BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure("123", BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure(12, BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure(true, BSureType.OBJECT)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an object")

    res = bsure({}, BSureType.OBJECT)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toEqual({})
    expect(res.error).toBe(undefined)
})

test("bsure.email", () => {
    let res: any

    res = bsure(null, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure(undefined, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure(NaN, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure([], BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("123", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure(12, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure(true, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure({}, BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("foo@bar.com", BSureType.EMAIL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("foo@bar.com")
    expect(res.error).toBe(undefined)

    res = bsure(" foo+bar@bar.com", BSureType.EMAIL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("foo+bar@bar.com")
    expect(res.error).toBe(undefined)

    res = bsure("foo+bar@send.bar.com", BSureType.EMAIL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("foo+bar@send.bar.com")
    expect(res.error).toBe(undefined)

    res = bsure("foo+bar@send", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("foo+bar@", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("@send.com", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("send.com", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")

    res = bsure("!@#$%^&*()@send.com", BSureType.EMAIL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not an email")
})

test("bsure.phone", () => {
    let res: any

    res = bsure(null, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure(undefined, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure(NaN, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure([], BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure("123", BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure(12, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure(true, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure({}, BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a phone number")

    res = bsure("+1 1234567890", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+11234567890")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123-456-7890", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+11234567890")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123.456.7890", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+11234567890")
    expect(res.error).toBe(undefined)

    res = bsure("+1 (123) 456-7890", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+11234567890")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+11234567890")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 ext1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 ext 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 extension1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 extension 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 extension:1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 extension: 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x:1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x: 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x-1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x - 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x.1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x . 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x_1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("+1 123 456 7890 x _ 1234", BSureType.PHONE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("+112345678901234")
    expect(res.error).toBe(undefined)

    res = bsure("1234567890", BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("missing country code")

    res = bsure("123-456-7890", BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("missing country code")

    res = bsure("123.456.7890", BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("missing country code")

    res = bsure("casdf123 456 7890 x _ 1234", BSureType.PHONE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("missing country code")
})

test("bsure.url", () => {
    let res: any

    res = bsure(null, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure(undefined, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure(NaN, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure([], BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure("123", BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure(12, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure(true, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure({}, BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure("casdf123 456 7890 x _ 1234", BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure("", BSureType.URL)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a url")

    res = bsure("http://foo.com", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz#section", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz#section")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz/", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz/")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz/", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz/")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz?foo=bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz?foo=bar")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz?foo=bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz?foo=bar")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz?foo=bar&baz=foo", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz?foo=bar&baz=foo")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz?foo=bar&baz=foo", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz?foo=bar&baz=foo")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz?foo=bar&baz=foo#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz?foo=bar&baz=foo#bar")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz?foo=bar&baz=foo#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz?foo=bar&baz=foo#bar")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz?foo=bar#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz?foo=bar#bar")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz?foo=bar#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz?foo=bar#bar")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz#bar")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz#bar", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz#bar")
    expect(res.error).toBe(undefined)

    res = bsure("http://foo.com/bar/baz#", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("http://foo.com/bar/baz#")
    expect(res.error).toBe(undefined)

    res = bsure("https://foo.com/bar/baz#", BSureType.URL)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBe("https://foo.com/bar/baz#")
    expect(res.error).toBe(undefined)
})

test("bsure.date", () => {
    let res: any

    res = bsure(null, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure(undefined, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure(NaN, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure([], BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure("123", BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure(12, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure(true, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure({}, BSureType.DATE)
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("not a date")

    res = bsure(new Date(), BSureType.DATE)
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBeInstanceOf(Date)
    expect(res.error).toBe(undefined)

    res = bsure(new Date(2000), BSureType.DATE, { min: 2000, max: 4000 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBeInstanceOf(Date)
    expect(res.error).toBe(undefined)

    res = bsure(new Date(4000), BSureType.DATE, { min: 2000, max: 4000 })
    expect(res.isValid).toBe(true)
    expect(res.cleanValue).toBeInstanceOf(Date)
    expect(res.error).toBe(undefined)

    res = bsure(new Date(1000), BSureType.DATE, { min: 2000, max: 4000 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too early")

    res = bsure(new Date(5000), BSureType.DATE, { min: 2000, max: 4000 })
    expect(res.isValid).toBe(false)
    expect(res.cleanValue).toBe(undefined)
    expect(res.error).toBe("too late")
})
