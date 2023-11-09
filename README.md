# bsure

`bsure` is a validation library for Node.js that provides a simple, yet powerful way to validate and clean values of different types. It supports a range of common data types and offers options for custom validation, type conversion, and constraints like min/max values.

## Features

- Validate common data types: String, Number, Boolean, Array, Object, Email, Phone, URL, Date.
- Convert values to the expected data type if needed.
- Apply minimum and maximum constraints for numerical and string values.
- Custom validator functions for complex or unique validation rules.
- Easy to use with TypeScript for added type safety.

## Installation

Install the package using npm:

```bash
npm install bsure
```
Or using yarn:

```bash
yarn add bsure
```

## Usage

```javascript
import { bsure, BSureType } from 'bsure';

const result = bsure<string>('hello', BSureType.STRING);
if (result.isValid) {
    console.log('Valid string:', result.cleanValue);
} else {
    console.error('Validation error:', result.error);
}
```

### Validating Different Types
You can validate different types by passing the respective BSureType enum value:

```javascript
const numberResult = bsure<number>(123, BSureType.NUMBER);
const booleanResult = bsure<boolean>('yes', BSureType.BOOLEAN, { convert: true });
```

### Using Options
Apply additional options like min/max constraints:

```javascript
const options = { min: 10, max: 20 };
const constrainedNumber = bsure<number>(15, BSureType.NUMBER, options);
```

### Custom Validation
You can provide a custom validator function:

```javascript
const customOptions = {
    validator: (value) => {
        if (value?.startsWith('custom_')) {
            return value.replace("custom_", "")
        }
        throw("not a custom value")
    }
};
const customValidation = bsure<string>('custom_value', BSureType.CUSTOM, customOptions);
```

## API Reference
Refer to the following API sections for detailed usage of each type:

```
BSureType.STRING: Validates and cleans a string value.
BSureType.NUMBER: Validates and cleans a number value.
BSureType.BOOLEAN: Validates and cleans a boolean value.
BSureType.ARRAY: Validates and ensures an array value.
BSureType.OBJECT: Validates and ensures an object value.
BSureType.EMAIL: Validates an email string.
BSureType.PHONE: Validates a phone number string.
BSureType.URL: Validates a URL string.
BSureType.DATE: Validates a date value.
```

Contributing
Contributions are welcome! 

License
This project is licensed under the MIT License - see the LICENSE file for details.