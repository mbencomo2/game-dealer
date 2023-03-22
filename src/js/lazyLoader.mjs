export function lazyLoader(imagesToLoad) {
  const options = {
    threshold: 0.2,
  };
  const loadImage = (image) => {
    let src = image.dataset.src;
    image.setAttribute("src", src);
    image.removeAttribute("data-src");
  };
  const observe = (entries, intersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        intersectionObserver.unobserve(img);
      }
    });
  };
  const observer = new IntersectionObserver(observe, options);
  if ("IntersectionObserver" in window) {
    imagesToLoad.forEach((img) => observer.observe(img));
  } else {
    imagesToLoad.forEach(loadImage);
  }
}
