/*** Chunk Array Into Bite-size Chunks ****/

export const chunkArray = (array, n) => {
        const result = []
        for (let i = 0; i < array.length; i += n) {
            result.push(array.slice(i, i + n))
        }
        return result
    }


export const uniqByKeepLast = (data, key) => {
        return [
            ...new Map(
                data.map( x => [key(x), x])
            ).values()
        ]
    }

export const writeToCache = (url, data) =>
        localStorage.setItem(url, JSON.stringify(data))

export const readFromCache = (url) => JSON.parse(localStorage.getItem(url)) || null
  

