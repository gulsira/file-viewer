export function formatFileSize(bytes, hideSize) {
    if (bytes === 0) return "0 Bytes";
    var k = 1000,
        dm = 2,
        sizes = ["Bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
        " " +
        (hideSize ? "" : sizes[i])
    );
}