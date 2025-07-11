const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const videoURL = req.body.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'সঠিক ইউটিউব URL দিন।' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(videoURL, { quality: 'highestvideo' }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'ভিডিও ডাউনলোড করতে সমস্যা হয়েছে।' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server চালু হয়েছে পোর্ট ${PORT} এ`);
});
