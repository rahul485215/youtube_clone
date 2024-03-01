import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import { valuConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {
    const {videoId} = useParams()

    const [apidata, setApiData] = useState(null)
    const [channeldata, setChannelData] = useState(null)
    const [commentdata, setCommentData] = useState([])

    const fetchVideoData = async () =>{
        //Fetching videos data
        const videoDetails_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
    }

    const fetchOtherData =async () =>{
        //Fetching Channel Data
        if(apidata&&apidata.snippet){
        const channelData_url=` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`

        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))
        
        //Fetching Comment Data
        const comment_url= `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`

        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
        }
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
        fetchOtherData()
    },[apidata])
  return (
   <div className='play-video'>
    {/* <video src={video} controls autoPlay muted ></video> */}
    {apidata && (
        <>
    <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <h3>{apidata?apidata.snippet.title:"Title Here"}</h3>
    <div className="play-video-info">
        <p>{apidata?valuConverter(apidata.statistics.viewCount):"16K"} Views &bull; {apidata?moment(apidata.snippet.publishedAt).fromNow():""}</p>
        <div>
            <span><img src={like} alt="" />{apidata?valuConverter(apidata.statistics.likeCount):155}</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={save} alt="" />Save</span>
        </div>
    </div>
    <hr />
    <div className="publisher">
        <img src={channeldata?channeldata.snippet.thumbnails.default.url:""} alt="" />
        <div>
            <p>{apidata?apidata.snippet.channelTitle:""}</p>
            <span>{channeldata?valuConverter(channeldata.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
    </div>
    <div className="video-description">
       <p>{apidata?apidata.snippet.description.slice(0,250):"Description Here"}</p>
        <hr />
        <h4>{apidata?valuConverter(apidata.statistics.commentCount):100} Comments</h4>

        {commentdata.map((item,index)=>{
            return(
                <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>  
            )
        })}
       
    </div>
    </>
    )}
   </div>
  )
}

export default PlayVideo