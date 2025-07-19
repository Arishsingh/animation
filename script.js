function locomotive() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
  
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
  locomotive();
  
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });
  
  // auto-generate filenames with correct folder
  function files(index) {
    const number = (index + 1).toString().padStart(4, "0");
    return `./CYBERFICTION-IMAGES/male${number}.png`;
  }
  
  const frameCount = 300;
  
  const images = [];
  const imageSeq = {
    frame: 0,
  };
  
  // preload images
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }
  
  // animate scroll through frames
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page>canvas",
      start: "top top",
      end: "600% top",
      scroller: "#main",
    },
    onUpdate: render,
    onComplete: () => {
      imageSeq.frame = frameCount - 1;
      render();
    },
  });
  
  // render first frame after preload
  images[0].onload = render;
  
  function render() {
    scaleImage(images[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  
  // pin canvas section
  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "600% top",
  });
  
  // pin other pages
  gsap.to("#page1", {
    scrollTrigger: {
      trigger: "#page1",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
  gsap.to("#page2", {
    scrollTrigger: {
      trigger: "#page2",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
  gsap.to("#page3", {
    scrollTrigger: {
      trigger: "#page3",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
  