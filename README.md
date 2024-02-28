# Youtube-Data-Aggregator

## Description

This project is a YouTube Channel Data Aggregator built with Express.js and the YouTube Data API. It allows users to fetch detailed information about a YouTube channel, including its most viewed video, by providing the channel's handle as a query parameter. The data returned includes the channel's name, custom URL handle, total views, subscriber count, number of videos, and engagement metrics for the most viewed video.

## Features

- Fetch channel details using the channel's handle.
- Retrieve the most viewed video of the channel.
- Gather engagement metrics such as view count, like count, and comment count for the most viewed video.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/AnirudhPI/Youtube-Data-Aggregator.git
cd Youtube-Data-Aggregator
```

2. **Install all dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a .env file in the root of your project and add your YouTube Data API key:
```bash
YOUTUBE_API_KEY=your_youtube_data_api_key_here
```

4. **Start the server**
```bash
node app.js
```

## Usage
To fetch channel data, make a GET request to the /channel endpoint with the handle query parameter set to the YouTube channel's handle:
```bash
http://localhost:3000/channel?handle=<channel_handle_here>
```

## References

[How to get API Key](https://blog.hubspot.com/website/how-to-get-youtube-api-key)
[Youtube Data API Documentation](https://developers.google.com/youtube/v3/docs)

## License

This project is licensed under the terms of the [MIT License](LICENSE.md).