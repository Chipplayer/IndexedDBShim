import CFG from './CFG';
import {encode as keyEncode, decode as keyDecode} from './Key';

/**
 * Compares two keys.
 * @param first
 * @param second
 * @returns {number}
 */
function cmp (first, second) {
    const encodedKey1 = keyEncode(first);
    const encodedKey2 = keyEncode(second);
    const result = encodedKey1 > encodedKey2
        ? 1
        : encodedKey1 === encodedKey2 ? 0 : -1;

    if (CFG.DEBUG) {
        // verify that the keys encoded correctly
        let decodedKey1 = keyDecode(encodedKey1);
        let decodedKey2 = keyDecode(encodedKey2);
        if (typeof first === 'object') {
            first = JSON.stringify(first);
            decodedKey1 = JSON.stringify(decodedKey1);
        }
        if (typeof second === 'object') {
            second = JSON.stringify(second);
            decodedKey2 = JSON.stringify(decodedKey2);
        }

        // Encoding/decoding mismatches are usually due to a loss of
        //   floating-point precision
        if (decodedKey1 !== first) {
            console.warn( // eslint-disable-line no-console
                first + ' was incorrectly encoded as ' + decodedKey1
            );
        }
        if (decodedKey2 !== second) {
            console.warn( // eslint-disable-line no-console
                second + ' was incorrectly encoded as ' + decodedKey2
            );
        }
    }

    return result;
}

export default cmp;
