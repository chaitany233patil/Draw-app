export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <div className="min-w-[1300px] flex justify-between p-8">
        <div className="text-white text-xl">DrawSync</div>
        <div className="text-white flex gap-10">
          <div>About</div>
          <div>Features</div>
          <div>Pricing</div>
        </div>
      </div>
    </div>
  );
}
