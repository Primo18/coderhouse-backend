process.on('message', (msg) => {
    if (msg === 'start') {
        let sum = 0;
        for (let i = 0; i <= 1000000; i++) {
            sum += i;
        }
        process.send(sum);
    }
});
