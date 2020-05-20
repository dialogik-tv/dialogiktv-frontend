let required = (propertyType) => {
    return v => v && v.length > 0 || `You must input a ${propertyType}`
}
let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength}`
}
let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${minLength}`
}

export {
    required,
    minLength,
    maxLength
}
