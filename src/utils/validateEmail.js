const emailValidation = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return isValid
}

export default emailValidation