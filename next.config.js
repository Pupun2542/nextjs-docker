module.exports = {
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com','lh3.googleusercontent.com','comuthor.com']
  },
  module: {
    rules: [
      {
        test: /\.(wav|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
}
