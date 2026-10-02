document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const videoUrl = body.dataset.video;
  const imageUrl = body.dataset.image;

  if (!document.querySelector('.page-bg')) {
    const bg = document.createElement('div');
    bg.className = 'page-bg';
    bg.setAttribute('aria-hidden', 'true');

    if (videoUrl) {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.poster = imageUrl || '';
      video.setAttribute('aria-hidden', 'true');
      bg.appendChild(video);
    }

    if (!videoUrl && imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '';
      bg.appendChild(img);
    }

    document.body.prepend(bg);
  }

  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia && !heroMedia.querySelector('img, video')) {
    const heroVideoUrl = body.dataset.video || heroMedia.dataset.video;
    const heroImageUrl = body.dataset.image || heroMedia.dataset.image;

    if (heroVideoUrl) {
      const video = document.createElement('video');
      video.src = heroVideoUrl;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('aria-hidden', 'true');
      video.setAttribute('poster', heroImageUrl || '');
      heroMedia.appendChild(video);
    } else if (heroImageUrl) {
      const img = document.createElement('img');
      img.src = heroImageUrl;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      heroMedia.appendChild(img);
    }
  }

  const musicAudio = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  if (musicAudio && musicToggle) {
    musicAudio.volume = 0.35;
    musicAudio.play().catch(() => {});

    musicToggle.addEventListener('click', async () => {
      if (musicAudio.paused) {
        try {
          await musicAudio.play();
          musicToggle.textContent = '❚❚ Music';
        } catch (error) {
          musicToggle.textContent = '♫ Music';
        }
      } else {
        musicAudio.pause();
        musicToggle.textContent = '♫ Music';
      }
    });
  }

  document.querySelectorAll('.card[data-image]').forEach((card) => {
    const media = document.createElement('div');
    media.className = 'card-media';

    const image = document.createElement('img');
    image.src = card.dataset.image;
    image.alt = '';
    image.loading = 'lazy';

    media.appendChild(image);
    card.prepend(media);
  });
});
