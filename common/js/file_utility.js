export function downloadAsTextFile(fileName, content) {
    const BLOB = new Blob([content], { 'type': 'text/plain' });
    const CAN_USE_SAVE_BLOB = window.navigator.msSaveBlob !== undefined;

    if (CAN_USE_SAVE_BLOB) {
        window.navigator.msSaveBlob(BLOB, fileName);
        return;
    }

    const TEMP_ANCHOR = document.createElement('a');
    TEMP_ANCHOR.href = URL.createObjectURL(BLOB);
    TEMP_ANCHOR.setAttribute('download', fileName);

    TEMP_ANCHOR.dispatchEvent(new MouseEvent('click'));
};