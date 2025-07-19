function Button({
  variant,
  className,
  children,
}: {
  variant: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-black"
      id="contact"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-blue-950/10"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        <div className="text-center">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="text-blue-300 text-sm font-medium">
              Contact Us
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-white">Your Team&apos;s </span>
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Collaboration?
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Join thousands of teams already using DrawSync to brainstorm, plan,
            and execute their best ideas. Start your free trial today and
            experience the future of collaborative whiteboarding.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              variant="primary"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-105 px-8 py-4 text-lg font-semibold"
            >
              Start Free Trial
            </Button>
            <Button
              variant="secondary"
              className="border-2 border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800/30 text-gray-300 hover:text-white px-8 py-4 text-lg font-semibold hover:scale-105"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-900/20 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-blue-400 text-xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Setup</h3>
              <p className="text-gray-400 text-sm">
                No downloads needed. Start collaborating in seconds directly
                from your browser.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-900/20 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-purple-400 text-xl">🔄</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Sync</h3>
              <p className="text-gray-400 text-sm">
                See changes instantly as your team collaborates from anywhere in
                the world.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-900/20 border border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <span className="text-cyan-400 text-xl">🔗</span>
              </div>
              <h3 className="text-white font-semibold mb-2">
                Easy Integration
              </h3>
              <p className="text-gray-400 text-sm">
                Connect with your existing tools and workflow seamlessly.
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-800/50">
            <p className="text-gray-500 text-sm mb-4">Trusted by teams at</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-gray-600 font-semibold">Microsoft</div>
              <div className="text-gray-600 font-semibold">Google</div>
              <div className="text-gray-600 font-semibold">Spotify</div>
              <div className="text-gray-600 font-semibold">Airbnb</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
