import React from "react";
import konserImage from "../../images/konser.jpg";

const Hero = () => {
  return (
    <section className="bg-light-bgcolor dark:bg-dark-bgcolor text-light-black dark:text-dark-white h-[calc(100vh-104px)] flex justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <img
          src={konserImage}
          alt="Konser"
          className="rounded-[4.5rem] w-full md:w-1/2 aspect-w-1 aspect-h-1 shadow-lg"
        />
        <div className="text-center md:text-left w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">Yıldızlar Yarışıyor ‘24</h1>
          <p className="">
            Yıldızlar Yarışıyor, kulübümüzün 2013 senesinden beri gerçekleştirdiği gelenekselleşmiş etkinliklerinden biridir. Türkiye’nin her bir yanındaki üniversitelerden katılan müzik gruplarına bu etkinlik sayesinde sahne alma fırsatı tanıyoruz. Yarışmacılar, performansları ardından alanında uzman sanatçılardan oluşan jüriler tarafından değerlendirilir. Bu değerlendirme sonucunda kazanan yarışmacılara müzik kariyerlerini ilerletmeleri adına ödüller verilir.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
