function Loading({ brand }) {
  return (
    <section className="bg-red-500 flex flex-col justify-center opacity-90 items-center absolute top-0 left-0 right-0 bottom-0 text-white text-lg">
      <h2 className=" text-5xl">Loading cars, brand:{brand ? brand : "any"}...</h2>
    </section>
  );
}

export default Loading;
