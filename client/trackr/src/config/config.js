const config = {
    development: {
      serverUrl: `http://${import.meta.env.VITE_LOCAL_HOST}:4003`,
    },
    production: {
      serverUrl: import.meta.env.VITE_EC2_HOST,
    },
};

export default config;     