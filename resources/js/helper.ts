export function getFirstTwoLettersOfLastName(fullName: string): string {
    const names = fullName.split(' ');
    const lastName = names[names.length - 1];
    return lastName.substring(0, 2);
}
