export default function HeroVideo() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[750px] sm:min-h-[840px] md:min-h-[900px] lg:min-h-[90vh] flex items-center justify-start overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/imdgallery/imd-2024-002-inauguration.png"
        >
          <source
            src="https://oss.matchpages.cn/matchpages/common/2026/0612/4687/6a2baf1fd483e/%E5%B1%95%E4%BD%8D_x264.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft Vignette / Contrast Mask matching live site */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/20" />
      </div>

      {/* Hero Content - Strictly Left-Aligned matching the official layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-36 pb-24">
        <div className="max-w-3xl text-left">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
            Indian Mushroom Days 2027 <br />
            <span className="text-[#0084ff]">&amp; Shroom Connect</span>
          </h1>

          {/* 3-Line Subtitle */}
          <div className="text-base sm:text-xl md:text-2xl text-white font-normal leading-relaxed space-y-1 drop-shadow-sm">
            <p>19-20-21 February 2027, Delhi, India</p>
            <p>A must-attend mushroom event.</p>
            <p>Cover All Section of Mushroom</p>
          </div>
        </div>
      </div>
    </section>
  );
}
