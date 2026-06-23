    const getStickyOffset = () => {
      const stickyHeader = document.querySelector('.site-header');
      return stickyHeader ? stickyHeader.getBoundingClientRect().height + 12 : 0;
    };
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - getStickyOffset();
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
    const header = document.querySelector('.site-header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const heroPosters = {
      1920: 'assets/images/presskit_heroVid_still-1920x1080.webp',
      1200: 'assets/images/presskit_heroVid_still-1200x675.webp',
      800: 'assets/images/presskit_heroVid_still-800x450.webp',
      600: 'assets/images/presskit_heroVid_still-600x338.webp'
    };
    const pickHeroPoster = () => {
      const heroVideo = document.getElementById('hero-video');
      if (!heroVideo) return;
      const w = window.innerWidth;
      const poster = w >= 1200 ? heroPosters[1920]
        : w >= 768 ? heroPosters[1200]
        : w >= 480 ? heroPosters[800]
        : heroPosters[600];
      heroVideo.poster = poster;
    };
    pickHeroPoster();
    window.addEventListener('resize', pickHeroPoster, { passive: true });

    const hydrateVideo = video => {
      if (video.dataset.hydrated) return;
      const webm = video.getAttribute('data-lazy-webm');
      const mp4 = video.getAttribute('data-lazy-mp4');
      const legacy = video.getAttribute('data-lazy-video');
      if (!webm && !mp4 && !legacy) return;
      video.dataset.hydrated = 'true';
      const addSource = (src, type) => {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        video.appendChild(source);
      };
      if (webm) addSource(webm, 'video/webm');
      if (mp4) addSource(mp4, 'video/mp4');
      if (!webm && !mp4 && legacy) addSource(legacy, 'video/mp4');
      video.preload = 'metadata';
      video.load();
      if (video.hasAttribute('autoplay') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    const lazyVideos = Array.from(document.querySelectorAll('video[data-lazy-webm], video[data-lazy-mp4], video[data-lazy-video]'));
    const videoRootMargin = window.matchMedia('(max-width: 599px)').matches ? '0px 0px' : '120px 0px';
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          hydrateVideo(entry.target);
          videoObserver.unobserve(entry.target);
        });
      }, { rootMargin: videoRootMargin });
      lazyVideos.forEach(video => videoObserver.observe(video));
    } else {
      lazyVideos.forEach(hydrateVideo);
    }

    document.querySelectorAll('.trailer-facade').forEach(facade => {
      const videoId = facade.dataset.youtubeId;
      const title = facade.dataset.youtubeTitle || 'YouTube video';
      const thumb = facade.querySelector('.trailer-facade__thumb');
      if (thumb && videoId) {
        thumb.addEventListener('error', () => {
          const src = thumb.currentSrc || thumb.src;
          if (src.includes('maxresdefault')) {
            thumb.src = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
          } else if (src.includes('sddefault')) {
            thumb.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          }
        });
      }
      const activate = () => {
        if (facade.classList.contains('is-playing')) return;
        facade.classList.add('is-playing');
        const iframe = document.createElement('iframe');
        iframe.className = 'trailer-video';
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        iframe.title = title;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        facade.appendChild(iframe);
      };
      facade.querySelector('.trailer-facade__play')?.addEventListener('click', activate);
      facade.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });

    const lazyAudios = Array.from(document.querySelectorAll('audio[data-lazy-audio]'));
    const hydrateAudio = audio => {
      if (audio.dataset.hydrated) return;
      const src = audio.dataset.lazyAudio;
      if (!src) return;
      audio.dataset.hydrated = 'true';
      const source = document.createElement('source');
      source.src = src;
      source.type = 'audio/mpeg';
      audio.appendChild(source);
    };
    lazyAudios.forEach(audio => {
      audio.addEventListener('play', () => {
        if (!audio.dataset.hydrated) {
          audio.pause();
          hydrateAudio(audio);
          audio.load();
          const playPromise = audio.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        }
      });
    });
    if ('IntersectionObserver' in window) {
      const audioObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          hydrateAudio(entry.target);
          audioObserver.unobserve(entry.target);
        });
      }, { rootMargin: '200px 0px' });
      lazyAudios.forEach(audio => audioObserver.observe(audio));
    } else {
      lazyAudios.forEach(hydrateAudio);
    }

    document.querySelectorAll('[data-settings-carousel]').forEach(carousel => {
      const viewport = carousel.querySelector('.settings-carousel__viewport');
      const track = carousel.querySelector('.settings-carousel__track');
      const slides = Array.from(carousel.querySelectorAll('.settings-carousel__slide'));
      const dots = Array.from(carousel.querySelectorAll('.settings-carousel__dot'));
      const prevBtn = carousel.querySelector('.settings-carousel__btn--prev');
      const nextBtn = carousel.querySelector('.settings-carousel__btn--next');
      if (!viewport || !track || !slides.length) return;

      let activeIndex = 0;

      const hydrateSlideImage = slide => {
        const img = slide.querySelector('img[data-src]');
        const source = slide.querySelector('source[data-srcset]');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        if (source && source.dataset.srcset) {
          source.srcset = source.dataset.srcset;
          delete source.dataset.srcset;
        }
      };

      const setActive = index => {
        activeIndex = Math.max(0, Math.min(index, slides.length - 1));
        slides.forEach((slide, i) => {
          slide.setAttribute('aria-hidden', i === activeIndex ? 'false' : 'true');
        });
        dots.forEach((dot, i) => {
          dot.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
        });
        if (prevBtn) prevBtn.disabled = activeIndex === 0;
        if (nextBtn) nextBtn.disabled = activeIndex === slides.length - 1;
        hydrateSlideImage(slides[activeIndex]);
        const next = slides[activeIndex + 1];
        if (next) hydrateSlideImage(next);
      };

      const goTo = index => {
        const slide = slides[index];
        if (!slide) return;
        setActive(index);
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        slide.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', inline: 'start', block: 'nearest' });
      };

      prevBtn?.addEventListener('click', () => goTo(activeIndex - 1));
      nextBtn?.addEventListener('click', () => goTo(activeIndex + 1));
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = Number(dot.dataset.slide);
          if (!Number.isNaN(index)) goTo(index);
        });
      });

      let scrollRaf = 0;
      viewport.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => {
          const width = viewport.clientWidth || 1;
          const index = Math.round(viewport.scrollLeft / width);
          if (index !== activeIndex) setActive(index);
        });
      }, { passive: true });

      let dragStartX = 0;
      let dragScrollLeft = 0;
      let isDragging = false;
      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove('is-dragging');
        const width = viewport.clientWidth || 1;
        const nearest = Math.round(viewport.scrollLeft / width);
        goTo(nearest);
      };
      viewport.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragScrollLeft = viewport.scrollLeft;
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture(e.pointerId);
      });
      viewport.addEventListener('pointermove', e => {
        if (!isDragging) return;
        viewport.scrollLeft = dragScrollLeft - (e.clientX - dragStartX);
      });
      viewport.addEventListener('pointerup', endDrag);
      viewport.addEventListener('pointercancel', endDrag);

      setActive(0);
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const heroVideoEl = document.getElementById('hero-video');
    const updateMotionPreference = prefersReduced => {
      lazyVideos.forEach(video => {
        if (prefersReduced) {
          video.pause();
          video.removeAttribute('autoplay');
          return;
        }
        video.setAttribute('autoplay', '');
        if (!video.dataset.hydrated) return;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      });
      if (heroVideoEl) {
        if (prefersReduced) {
          heroVideoEl.pause();
        } else {
          const p = heroVideoEl.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        }
      }
    };
    updateMotionPreference(reducedMotion.matches);
    reducedMotion.addEventListener('change', e => updateMotionPreference(e.matches));
