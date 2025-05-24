const axios = require("axios");

const mimeTypes = {
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    flv: "video/x-flv",
    m4v: "video/x-m4v",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    m3u8: "application/vnd.apple.mpegurl",
    ts: "video/mp2t",
};

const downloadVideo = async (req, res) => {
    const { videoUrl, title = "video", ext = "mp4" } = req.query;
    if (!videoUrl) return res.status(400).send("Missing videoUrl");
    const safeTitle = title.replace(/[^a-zA-Z0-9-_ ]/g, "").trim().slice(0, 100);
    const safeExtension = ext.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const mimeType = mimeTypes[safeExtension] || "application/octet-stream";
    try {
        const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
            },
        });

        res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.${safeExtension}"`);
        res.setHeader("Content-Type", mimeType);

        const contentLength = response.headers["content-length"];
        if (contentLength) {
            res.setHeader("Content-Length", contentLength);
        }

        response.data.pipe(res);
    } catch (error) {
        console.error("Proxy error:", error.message);
        res.status(500).send("Failed to download video");
    }
};

module.exports = { downloadVideo };
