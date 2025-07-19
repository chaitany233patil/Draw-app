import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <div className="min-h-screen flex pb-20 pt-28 mb-20">
      <div className="relative max-w-7xl m-auto flex flex-col items-center justify-center py-40 px-10 overflow-hidden">
        <div className="absolute top-[-270px]  z-[-10] w-250 h-150 rounded-full bg-radial from-blue-800 to-black opacity-60 blur-lg "></div>
        <h2 className="text-2xl text-white font-semibold flex items-center gap-2 mb-4">
          <span className="relative flex items-center justify-center size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
          </span>
          <span className="text-lg sm:text-xl">Contact Us</span>
        </h2>
        <p className="text-gray-300 text-center text-lg sm:text-xl mx-auto mb-8 max-w-3xl">
          We&apos;re always looking for new opportunities to collaborate and
          grow. If you have any questions or would like to get in touch, please
          use the button below.
        </p>
        <div className="flex items-center justify-center gap-4 text-center">
          <Button
            variant="primary"
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg shadow-blue-600/40 hover:shadow-blue-600/50 transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
