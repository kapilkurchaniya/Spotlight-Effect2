const Hero = () => {
  return (
    <section className="relative h-screen">
      <img
        src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
        <h1 className="text-6xl font-light tracking-widest">
          DESIGN <br /> & FREEDOM
        </h1>

        <p className="mt-4 text-gray-300 max-w-md">
          Explore independent style by embracing uniqueness with exclusive designer apparel.
        </p>

        <button className="mt-6 w-fit px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
