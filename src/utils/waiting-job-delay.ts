async function WaitingJobDelay(delayMilliseconds: number){
    return await new Promise((resolve, reject) => {
        setInterval(() => {
            resolve(true);
        }, delayMilliseconds)
    })
}

export { WaitingJobDelay }
