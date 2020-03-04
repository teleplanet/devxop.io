createMarkup = function(obj) {
    var keys = Object.keys(obj)
    if (!keys.length) return ''
    var i, len = keys.length
    var result = ''

    for (i = 0; i < len; i++) {
        var key = keys[i]
        var val = obj[key]
        result += key + ':' + val + ';'
    }

    return result
}
