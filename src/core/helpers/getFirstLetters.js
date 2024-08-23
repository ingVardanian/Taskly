export const getFirstLetters = (fullName) => {
    const splitNames = fullName.trim().split(' '); 
    return splitNames.map((name) => name[0]?.toUpperCase()).join(' '); 
};


