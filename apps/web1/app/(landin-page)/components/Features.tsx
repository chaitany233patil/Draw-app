export default function Features() {
  return (
    <div className="relative flex flex-col items-center justify-center px-10 mt-20">
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex items-center justify-center size-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
        </span>
        <div className="mt-7 text-3xl mb-8">Features</div>
      </div>
      <div className="text-[24px] leading-9 text-gray-300 max-w-200 text-center mb-10">
        Our collaborative whiteboard is packed with features designed to enhance
        your team&apos;s productivity and creativity.
      </div>
      <div className="flex flex-wrap justify-center h-50 max-w-250 gap-15 mb-20">
        <div className="bg-blue-400/40 backdrop-blur-[80px] h-full flex-1 flex flex-col gap-2 items-center justify-center p-6 rounded-3xl">
          <div className="text-[24px] leading-7 text-center ">
            Real-Time Collaboration
          </div>
          <p className="text-stone-300 text-center">
            Work together with your team in real-time, no matter where they are.
            See changes instantly and keep everyone on the same page.
          </p>
        </div>
        <div className="bg-blue-400/40 backdrop-blur-[80px] h-full flex-1 flex flex-col gap-2 items-center justify-center p-6 rounded-3xl">
          <div className="text-[24px] leading-7 text-center">
            Versatile Drawing <br /> Tools
          </div>
          <p className="text-stone-300 text-center">
            Choose from a wide range of drawing tools, shapes, and templates to
            express your ideas visually and effectively.
          </p>
        </div>
        <div className="bg-blue-400/40 backdrop-blur-[80px] flex-1 flex flex-col gap-2 items-center justify-center p-6 rounded-3xl">
          <div className="text-[24px] leading-7 text-center">
            Seamless <br /> Integration
          </div>
          <p className="text-stone-300 text-center">
            Integrate with your favorite productivity tools to streamline your
            workflow and keep all your work in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
