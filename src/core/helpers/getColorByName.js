const avatarColors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068', '#108ee9'];

export const getColorByName = (name) => {
    let charSum = 0;
    for (let i = 0; i < name.length; i++) {
        charSum += name.charCodeAt(i);
    }
    return avatarColors[charSum % avatarColors.length];
};
