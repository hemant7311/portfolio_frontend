import React, { useEffect, useState } from "react";
import HeroBgAnimation from "../HeroBgAnimation";
import HeroImg from "../../images/img2.jpeg";
import Typewriter from "typewriter-effect";

const fetchBio = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/api/bio`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch bio:", e);
    return null;
  }
};

const HeroSection = () => {
  const [bio, setBio] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // 🔹 Track screen width
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 🔹 Device flags
  const isMobile = width <= 576;
  const isTablet = width > 576 && width <= 991;
  const isDesktop = width > 991;

  // 🔹 Fetch bio
  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchBio();
      if (mounted) setBio(data);
    })();
    return () => (mounted = false);
  }, []);

  // 🔹 Dynamic image styles
  const imageWrapperSize = isMobile ? 300 : isTablet ? 360 : 430;
  const imageScale = isMobile ? 1.05 : isTablet ? 1.06 : 1.08;
  const imagePosition = isMobile
    ? "50% 0%"
    : isTablet
    ? "50% 8%"
    : "60% 5%";

  return (
    <section
      id="about"
      className="py-5 position-relative"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-end"
        style={{ zIndex: 0 }}
      >
        <HeroBgAnimation />
      </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h1 className="fw-bold display-5 text-light">
              Hi, I am <br />
              <span>{bio?.name || "..."}</span>
            </h1>

            <div className="fs-4 text-light d-flex gap-2 align-items-center">
              <span>I am a</span>
              <span className="text-primary">
                <Typewriter
                  options={{
                    strings: bio?.roles || [],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>

            <p className="mt-3 text-secondary">
              {bio?.description || ""}
            </p>

            {bio?.resume && (
              <a
                href="/Hemant Kumar (1).pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-3"
              >
                Check Resume
              </a>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: imageWrapperSize,
                height: imageWrapperSize,
                overflow: "hidden",
                marginTop: isMobile ? 20 : 40,
              }}
            >
              <img
                src={HeroImg}
                alt="hero"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  objectPosition: imagePosition,
                  transform: `scale(${imageScale})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
