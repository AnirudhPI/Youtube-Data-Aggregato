const helper = require('./helpers/helper')
const express = require('express'); 
const { google } = require('googleapis');

require('dotenv').config();

const app = express(); 
const PORT = 3000; 

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});
  

// Provide Channel handle to get details
app.get('/channel', async (req, res) => {
    console.log('entering');
    const handle = req.query.handle;

    if (!handle) {
      return res.status(400).send('Handle not provided');
    }
    
    try {
        const response = await youtube.channels.list({
            part: 'snippet,statistics',
            forHandle: handle,
        });

        if (response.data.items.length === 0) {
            return res.status(404).send('Channel not found');
        }

        const nameOfChannel = response.data.items[0].snippet.title
        const handleOfChannel = response.data.items[0].snippet.customUrl;
        const totalViewsOfChannel = response.data.items[0].statistics.viewCount;
        const subscribersOfChannel = response.data.items[0].statistics.subscriberCount;
        const noOfVideos = response.data.items[0].statistics.videoCount;
        const channelId = response.data.items[0].id;
        const mostViewedVideoId = await helper.getMostViewedVideoId(channelId);
        const stats = await helper.getVideoEngagementMetrics(mostViewedVideoId);

        const channelInfo = {
          name: nameOfChannel,
          handle: handleOfChannel,
          totalViews: totalViewsOfChannel,
          subscribers: subscribersOfChannel,
          videosCount: noOfVideos,
          mostViewedVideoStats: stats
        };
        
        console.log('Channel Info: ', channelInfo);
        
        res.json(channelInfo);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 