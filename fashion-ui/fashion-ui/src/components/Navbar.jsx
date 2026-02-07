const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-16 py-6 text-white">
      <h1 className="text-xl font-semibold">DVSY</h1>

      <ul className="flex gap-8 text-sm text-gray-300">
        <li className="hover:text-white cursor-pointer">Designers</li>
        <li className="hover:text-white cursor-pointer">Collections</li>
        <li className="hover:text-white cursor-pointer">Events</li>
        <li className="hover:text-white cursor-pointer">Blog</li>
      </ul>

      <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
        Get in Touch
      </button>
    </nav>
  );
};

export default Navbar;
