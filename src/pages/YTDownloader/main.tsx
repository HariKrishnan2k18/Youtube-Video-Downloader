/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

function YTDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const fetchFormats = async () => {
    if (!videoUrl) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/YTvideo/formats",
        {
          videoUrl
        }
      );
      setFormats(response.data.formats);
      setMessage(`Available formats for: ${response.data.title}`);
    } catch (error) {
      console.error("Error fetching formats:", error);
      setMessage("Failed to fetch formats.");
    }
  };

  const handleDownload = async () => {
    if (!selectedFormat) {
      alert("Please select a format");
      return;
    }

    try {
      const response = await axios({
        url: "http://localhost:8000/YTvideo/download",
        method: "POST",
        data: { videoUrl, formatId: selectedFormat },
        responseType: "blob",
        onDownloadProgress: (event: any) => {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percentCompleted);
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `video.${selectedFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage("Download completed successfully.");
      setProgress(0);
    } catch (error: any) {
      console.error("Error downloading file:", error.message);
      setMessage("Failed to download the video.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={fetchFormats} style={{ padding: "10px 20px" }}>
        Fetch Formats
      </button>
      <p>{message}</p>

      {formats.length > 0 && (
        <div>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          >
            <option value="">Select Format</option>
            {formats.map((format: any) => (
              <option key={format.format_id} value={format.format_id}>
                {format.resolution} ({format.ext})
              </option>
            ))}
          </select>
          <br />
          <button onClick={handleDownload} style={{ padding: "10px 20px" }}>
            Download
          </button>
        </div>
      )}

      {progress > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p>Downloading: {progress}%</p>
          <progress
            value={progress}
            max="100"
            style={{ width: "300px" }}
          ></progress>
        </div>
      )}
    </div>
  );
}

export default YTDownloader;
