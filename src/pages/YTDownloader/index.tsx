/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

function YTDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [formats, setFormats] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const fetchFormats = async () => {
    if (!videoUrl) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/YTvideo/formats",
        { videoUrl }
      );
      setFormats(response.data.formats);
      setImageUrl(response.data.thumbnail);
      setMessage(`Available formats for: ${response.data.title}`);
    } catch (error) {
      console.error("Error fetching formats:", error);
      setMessage("Failed to fetch formats.");
    }
  };

  const handleDownload = async (formatId: string) => {
    if (!formatId) {
      alert("Please select a format");
      return;
    }
    try {
      const response = await axios({
        url: "http://localhost:8000/YTvideo/download",
        method: "POST",
        data: { videoUrl, formatId: formatId }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `video.${formatId}.mp4`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMessage("Download completed successfully.");
    } catch (error: any) {
      console.error("Error downloading video:", error.message);
      setMessage("Failed to download the video.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>YouTube Video Downloader</h2>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={fetchFormats} style={{ padding: "10px 20px" }}>
        Download
      </button>
      <p>{message}</p>
      {imageUrl && <img src={imageUrl} width={360}></img>}

      {formats.length > 0 && (
        <div style={{ display: "flex" }}>
          {formats.length === 1 ? (
            <span onClick={() => handleDownload(formats[0].format_id)}>
              {`${formats[0].resolution} ${formats[0].ext} ${formats[0].size} MB`}
            </span>
          ) : (
            <select
              onChange={(e) => handleDownload(e.target.value)}
              style={{ margin: "10px", padding: "10px" }}
            >
              <option value="">Select Format</option>
              {formats.map((format: any) => (
                <option key={format.format_id} value={format.format_id}>
                  {`${format.resolution} ${format.ext} ${format.size}`}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}

export default YTDownloader;
