export const stringify = (obj, spacesPerTab=4) => {
    const str = JSON.stringify(obj, null, spacesPerTab);
    if (!str) {
        return '';
    }

    // Concatenate short lines together, so that lists of numbers, etc. end up on the same line
    // But don't do this for lines that are just brackets and commas, so that structure is still easy to see
    let lastLineWasTrimmed = false;
    return str.split('\n').reduce(
        (output, lineWithLeadingSpaces) => {
            const trimmedLine = lineWithLeadingSpaces.trim();
            if (
                lastLineWasTrimmed &&
                '],'.indexOf(trimmedLine) === 0
            ) {
                lastLineWasTrimmed = true;
                return output + trimmedLine;
            } else if (
                trimmedLine.length < 6 &&
                '{([],},),'.indexOf(trimmedLine) < 0
            ) {
                lastLineWasTrimmed = true;
                return output + trimmedLine;
            } else {
                lastLineWasTrimmed = false;
                return output + '\n' + lineWithLeadingSpaces;
            }
        },
        ''
    ).trim();
};
