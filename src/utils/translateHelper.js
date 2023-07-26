import {
    translate as _translate
} from '../api/translate'

export function translate(input) {
    return _translate(input).then(res => {
        return res.data.translateResult[0][0].tgt
    })
}