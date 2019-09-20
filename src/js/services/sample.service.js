/**
 * @returns mock data afer 2 seconds
 */
export function dummy () {
    return new Promise(resolve => {
        setTimeout(() => {
            const mock = {
                test: 'Mock data'
            }
            resolve(mock)
        }, 2000)
    });
}



