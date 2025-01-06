import React from "react";

const CategorySection = () => {
  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white h-[calc(100vh-104px)] flex justify-center items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ödül Kategorileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Beste Kategorisi</h3>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dui mauris, dignissim vel enim nec, auctor venenatis sem.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Cover Kategorisi</h3>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dui mauris, dignissim vel enim nec, auctor venenatis sem.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Alt Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Bireysel Performans</h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Grup Performansı</h3>
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
