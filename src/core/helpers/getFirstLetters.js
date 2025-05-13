export const getFirstLetters = (fullName) => {
    if (!fullName || typeof fullName !== 'string') {
        return '';  // Return an empty string if fullName is invalid
    }
    const splitNames = fullName.trim().split(' '); 
    return splitNames.map((name) => name[0]?.toUpperCase()).join(' '); 
};
