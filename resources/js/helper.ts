export function getFirstTwoLettersOfLastName(fullName: string): string {
    const names = fullName.split(' ');
    const lastName = names[names.length - 1];
    return lastName.substring(0, 2);
}

interface ValidFile {
    name: string;
    size: number;
    type: string;
}

export function isValidImage(file: ValidFile) {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    return allowedTypes.includes(file.type);

}

export function isValidSize(file: ValidFile) {

    const maxSizeInBytes = 1024 * 1024; // 1 MB
    return file.size <= maxSizeInBytes;

}
