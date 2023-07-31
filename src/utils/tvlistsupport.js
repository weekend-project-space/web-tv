export function parse(obj, name) {
    let suffixName = suffix(name)
    return convert[suffixName](obj).filter((o) =>
        o.url.includes(location.protocol.split(":")[0])
    )
}


export function suffix(name) {
    name = name.lastIndexOf('/') > 0 - 1 ? name.substring(name.lastIndexOf('/') + 1) : name;
    return name.lastIndexOf('.') > 0 - 1 ? name.substring(name.lastIndexOf('.') + 1) : 'm3u';
}

const convert = {
    m3u: (obj) => {
        let lines = obj.split('\n')
        let len = lines.length
        let r = []
        let tvname = undefined
        let meta = undefined
        for (let i = 0; i < len; i++) {
            let line = lines[i].trim()
            if (i == 0) {
                if (line.indexOf('#EXTM3U') < 0) {
                    return r
                } else {
                    //skip
                }
            } else {
                if (line.indexOf('#EXTINF') == 0) {
                    let args = line.split(',')
                    tvname = args[args.length - 1]
                    meta = undefined
                    let metastr = line.substring(line.indexOf(' '), line.lastIndexOf(',')).trim()
                    if (metastr.length > 2) {
                        meta = {}
                        let kvs = metastr.split(' ')
                        for (let kv of kvs) {
                            let kvarr = kv.split('=')
                            if (kvarr.length == 2) {
                                meta[kvarr[0]] = kvarr[1].replace(/"/g, '')
                            }
                        }
                    }
                } else {
                    r.push({
                        name: tvname,
                        url: line,
                        isTv: line.includes("http"),
                        meta
                    })
                }
            }
        }
        return r;
    },
    txt: (obj) => {
        return obj.split("\n").filter(line => line.trim().length).map((line) => {
            if (line) {
                let args = line.split(",");
                return {
                    name: args[0],
                    url: args[1],
                    isTv: args[1] && args[1].includes("http"),
                    caption: args.length > 2 ? args[2] : undefined
                };
            }
        });
    },
    json: (obj) => obj
}