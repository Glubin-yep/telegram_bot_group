module.exports = {
    apps: [
        {
            name: "DOBI",
            script: "dist/index.js",
            watch: ["dist"],
            ignore_watch: ["node_modules", "logs"],
            watch_options: {
                usePolling: true,
                interval: 1000,
            },
            env: {
                NODE_ENV: "development",
            },
            output: "./logs/out.log",
            error: "./logs/err.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
        },
    ],
};
