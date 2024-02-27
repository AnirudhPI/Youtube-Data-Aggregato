const { google } = require('googleapis');

require('dotenv').config();

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

async function getMostViewedVideoId(channelId) {
    try {
      const searchResponse = await youtube.search.list({
        part: 'id',
        channelId: channelId,
        order: 'date',
        maxResults: 50, 
        type: 'video',
      });
  
      const videoIds = searchResponse.data.items.map(item => item.id.videoId);
  
      const videosResponse = await youtube.videos.list({
        part: 'id,statistics',
        id: videoIds.join(','),
      });
  
      const sortedVideos = videosResponse.data.items.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
  
      if (sortedVideos.length === 0) {
        console.log('No view data available for videos.');
        return null;
      }
  
      const mostViewedVideoId = sortedVideos[0].id;
  
      console.log(`Most viewed video ID: ${mostViewedVideoId}`);
      return mostViewedVideoId;
    } catch (error) {
      console.error('Error fetching most viewed video:', error);
      throw error;
    }
}
  
async function getVideoEngagementMetrics(videoId) {
    if (!videoId) {
      return {
        message: "No video was uploaded by this user till date."
      };
    }

    try {
      const response = await youtube.videos.list({
        part: 'snippet,statistics',
        id: videoId, 
      });
  
      const videoDetails = response.data.items[0];
      const { viewCount, likeCount, commentCount } = videoDetails.statistics;
  
      const videoDetailsObject = {
        title: videoDetails.snippet.title,
        views: viewCount,
        likes: likeCount,
        comments: commentCount
      };
  
      return videoDetailsObject;

    } catch (error) {
      console.error('Error fetching video engagement metrics:', error);
      throw error;
    }
}

module.exports = {
    getMostViewedVideoId,
    getVideoEngagementMetrics
};