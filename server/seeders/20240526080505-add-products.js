"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        code: "ERPALC",
        product_name: "Gói bảo dưỡng xe tay ga nâng cao 15 bước",
        category_product_id: 1,
        shop_id: 1,
        product_price: "500.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/goi-bao-duong-xe-tay-ga-nang-cao-15-buoc-2278-slide-products-660a8261f204b.jpg",
      },
      {
        code: "OLMCKU",
        product_name: "Gói bảo dưỡng xe số, xe côn tay nâng cao 15 bước",
        category_product_id: 2,
        shop_id: 2,
        product_price: "450.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/goi-bao-duong-xe-so-xe-con-tay-nang-cao-15-buoc-2277-slide-products-660a7ee18e9fe.jpg",
      },
      {
        code: "ZNEPVI",
        product_name: "Gói bảo dưỡng xe tay ga tiêu chuẩn 11 bước",
        category_product_id: 2,
        shop_id: 1,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/goi-bao-duong-xe-tay-ga-tieu-chuan-11-buoc-2276-slide-products-660a7aa0df302.jpg",
      },
      {
        code: "DSYVOO",
        product_name: "Gói bảo dưỡng xe máy số, xe côn tay tiêu chuẩn 11 bước",
        category_product_id: 1,
        shop_id: 1,
        product_price: "175.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/goi-bao-duong-xe-may-so-xe-con-tay-tieu-chuan-11-buoc-2275-slide-products-660a7e4e6ad55.jpg",
      },
      {
        code: "TZC2GX",
        product_name: "Nhớt Motul Moto 20W50 1L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "105.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/nhot-motul-moto-20w50-1l-2274-slide-products-660e2319b6c53.jpg",
      },
      {
        code: "FSRZIA",
        product_name: "Nhớt láp (hộp số) Wolver GL-5 80W90",
        category_product_id: 2,
        shop_id: 2,
        product_price: "50.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/04/nhot-lap-hop-so-wolver-gl-5-80w90-2273-slide-products-660a27e2b0849.png",
      },
      {
        code: "GPLYCZ",
        product_name: "Nhớt Mobil 1 0W40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "315.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-mobil-1-0w40-1l-533-slide-products-65d711964c890.jpg",
      },
      {
        code: "BPDDQB",
        product_name: "Nhớt Mobil 1 5W30 1L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "315.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-mobil-1-5w30-1l-531-slide-products-65d711a903a91.jpg",
      },
      {
        code: "WE9COR",
        product_name: "Nhớt Fuchs Silkolene Pro 4 10W40 XP",
        category_product_id: 2,
        shop_id: 2,
        product_price: "275.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/10/nhot-fuchs-silkolene-pro-4-10w40-xp-1064-slide-products-635f32393264d.jpg",
      },
      {
        code: "AYVIBM",
        product_name: "Nhớt Motul 300V Factory Line 10W40 1L",
        category_product_id: 1,
        shop_id: 2,
        product_price: "435.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/motul-300v-factory-line-10w40-1l-17-slide-products-639fd884a0428.jpg",
      },
      {
        code: "NKOJ8Y",
        product_name: "Nhớt Motul H-Tech 100 4T 10W40",
        category_product_id: 1,
        shop_id: 1,
        product_price: "260.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/08/motul-h-tech-100-4t-10w40-18-slide-products-62fc7ffde6a94.png",
      },
      {
        code: "EIFFIJ",
        product_name: "Nhớt Motul 7100 10W50 4T 1L",
        category_product_id: 1,
        shop_id: 2,
        product_price: "285.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/11/motul-7100-10w50-4t-1l-354-slide-products-5fb61de0bb007.jpg",
      },
      {
        code: "LJVMIC",
        product_name: "Nhớt Motul Scooter Power LE 5W40 0.8L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "165.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/motul-scooter-power-le-5w40-08l-34-slide-products-62e359b5a2d2b.png",
      },
      {
        code: "MJNJWQ",
        product_name: "Nhớt Wolver Racing Synthetic 10W40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "195.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/09/nhot-wolver-racing-synthetic-10w40-1lit-492-slide-products-631abd3bac117.jpg",
      },
      {
        code: "MLS0XO",
        product_name: "Nhớt Liqui Moly 4T Synth 10W40 Street Race",
        category_product_id: 2,
        shop_id: 2,
        product_price: "350.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2018/11/nhot-liqui-moly-4t-synth-10w40-street-race-865-slide-products-5bebaa0b15a9b.jpg",
      },
      {
        code: "G8UQQI",
        product_name: "Nhớt Liqui Molygen Scooter 5W30",
        category_product_id: 1,
        shop_id: 1,
        product_price: "300.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-liqui-molygen-scooter-5w30-1973-slide-products-63a5377d7acf1.jpg",
      },
      {
        code: "XPUN1C",
        product_name: "Nhớt Repsol Racing 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "280.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/06/nhot-repsol-racing-10w40-1l-508-slide-products-6488398ce5378.png",
      },
      {
        code: "JIANWX",
        product_name: "Nhớt Repsol Smarter Scooter 4T 5W-40 0,8L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "180.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/04/nhot-repsol-smarter-scooter-4t-5w-40-08l-1965-slide-products-644b7de420c4f.jpg",
      },
      {
        code: "8XC3LK",
        product_name: "Nhớt Shell Advance Ultra 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "245.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/03/shell-advance-ultra-10w40-1l-28-slide-products-5e7c23e41e8f8.jpg",
      },
      {
        code: "J6SE8Z",
        product_name: "Nhớt Shell Advance Ultra Scooter 5W40 0,8L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "175.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/04/shell-advance-ultra-scooter-5w40-08l-693-slide-products-607cfd40aaf70.jpg",
      },
      {
        code: "WHDK2O",
        product_name: "Nhớt Mobil Super Moto Scooter 10W40 800ml",
        category_product_id: 2,
        shop_id: 2,
        product_price: "115.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/nhot-mobil-super-moto-scooter-10w40-800ml-2268-slide-products-664098cc4eb2a.png",
      },
      {
        code: "VFUVWS",
        product_name: "Nhớt Mobil Super Moto Scooter 10W40 1L",
        category_product_id: 1,
        shop_id: 2,
        product_price: "135.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-mobil-super-moto-scooter-10w40-1l-2267-slide-products-65dc0725d6e7b.png",
      },
      {
        code: "8WSFYB",
        product_name: "Nhớt Mobil Super Moto Scooter 10W30 800ml",
        category_product_id: 1,
        shop_id: 2,
        product_price: "105.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-xe-mobil-super-moto-scooter-10w30-08l-2266-slide-65bcaf96d4b03.jpg",
      },
      {
        code: "OWFI50",
        product_name: "Nhớt Mobil Super Moto 10W40 800ml",
        category_product_id: 1,
        shop_id: 2,
        product_price: "105.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-mobil-super-moto-10w40-800ml-2265-slide-65bcab04bffe2.jpg",
      },
      {
        code: "IRZGGY",
        product_name: "Nhớt Mobil Super Moto 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "125.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-mobil-super-moto-10w40-1l-2264-slide-65bca9c90abb0.png",
      },
      {
        code: "WOSYXC",
        product_name:
          "Nhớt Lap (Nhớt Hộp Số) Xe Ga Mobil Super Moto 80W90 120ml",
        category_product_id: 2,
        shop_id: 2,
        product_price: "50.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/nhot-lap-nhot-hop-so-xe-ga-mobil-super-moto-80w90-120ml-2263-slide-products-664ad166253ec.jpg",
      },
      {
        code: "QQWY7K",
        product_name: "Nhớt Amsoil 10W40 Performance 946ml",
        category_product_id: 2,
        shop_id: 1,
        product_price: "225.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/02/nhot-amsoil-10w40-performance-364-slide-products-620779b895f26.jpg",
      },
      {
        code: "RA74IO",
        product_name: "Nhớt Motul 3100 Gold 4T 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "125.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/05/nhot-motul-3100-gold-4t-10w40-1l-2065-slide-64561c8b443da.png",
      },
      {
        code: "T0QIDB",
        product_name: "Nhớt Motul 3100 Gold 4T 10W40 0,8L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "115.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/06/nhot-motul-3100-gold-4t-10w40-08l-2120-slide-products-649123fbb3f79.jpg",
      },
      {
        code: "DEORR9",
        product_name: "Nhớt Fuchs Silkolene Scoot Sport 4 5W40",
        category_product_id: 1,
        shop_id: 2,
        product_price: "215.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/06/nhot-fuchs-silkolene-scoot-sport-4-5w40-1065-slide-products-64883a0956a3e.jpg",
      },
      {
        code: "RHEEXP",
        product_name: "Nhớt Liqui Moly 4T Synth 5W40 Motorbike",
        category_product_id: 1,
        shop_id: 2,
        product_price: "415.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/03/nhot-liqui-moly-4t-synth-5w40-motorbike-512-slide-products-5e7c39eca53c8.jpg",
      },
      {
        code: "SVNP2Q",
        product_name: "Nhớt chiết lẻ Repsol Smarter Synthetic 4T 10W40 (100ml)",
        category_product_id: 1,
        shop_id: 1,
        product_price: "24.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/nhot-chiet-le-repsol-smarter-synthetic-4t-10w40-100ml-1874-slide-62da2432a64fb.png",
      },
      {
        code: "C3FCTR",
        product_name: "Nhớt Ipone Katana Full Power 10W30",
        category_product_id: 1,
        shop_id: 2,
        product_price: "385.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/nhot-ipone-katana-full-power-10w30-1837-slide-products-62c4235f7ca2b.jpeg",
      },
      {
        code: "E5ARGB",
        product_name: "Nhớt Ipone R4000RS 10W40",
        category_product_id: 1,
        shop_id: 1,
        product_price: "270.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/nhot-ipone-r4000rs-10w40-1833-slide-products-62c3e71271eeb.jpeg",
      },
      {
        code: "FSZ6EX",
        product_name: "Nhớt Repsol Smarter Scooter 4T 5W-40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "215.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-repsol-smarter-scooter-4t-5w-40-1l-1797-slide-products-639fcd76ba63b.jpg",
      },
      {
        code: "IEM3P8",
        product_name: "Nhớt Repsol Smarter Synthetic 4T 10W-40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "195.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/06/nhot-repsol-smarter-synthetic-4t-10w-40-1l-1796-slide-629efef648c71.jpg",
      },
      {
        code: "YYIV0X",
        product_name: "Nhớt Shell Advance Xe công nghệ Scooter 10W40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "140.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/04/shell-advance-xe-cong-nghe-scooter-10w40-1l-1718-slide-6247d8af6e80f.jpg",
      },
      {
        code: "H24Y00",
        product_name: "Nhớt Shell Advance Xe công nghệ Motorcycle 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "130.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/04/shell-advance-xe-cong-nghe-motorcycle-10w40-1l-1717-slide-6247d5b74baf9.jpg",
      },
      {
        code: "J8VYDT",
        product_name: "Chai dưỡng bóng dàn áo GoRacing",
        category_product_id: 2,
        shop_id: 2,
        product_price: "175.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/02/chai-duong-bong-dan-ao-goracing-1459-slide-products-601a76beb903d.jpg",
      },
      {
        code: "KZMENQ",
        product_name: "Nhớt chiết lẻ Liqui Moly Scooter Race 10W40 (100ml)",
        category_product_id: 1,
        shop_id: 1,
        product_price: "38.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/12/nhot-liqui-moly-scooter-race-10w40-100ml-1422-slide-products-5fe95830d4ec9.jpeg",
      },
      {
        code: "EEPCZU",
        product_name: "Nhớt Repsol MXR Platium 10W40 0,8L",
        category_product_id: 1,
        shop_id: 2,
        product_price: "175.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/01/nhot-repsol-mxr-platium-10w40-08l-1297-slide-products-5ffb198a76e9e.jpg",
      },
      {
        code: "S66ABD",
        product_name: "Nhớt Repsol MXR Platium 10W40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "195.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/04/nhot-repsol-mxr-platium-10w40-1l-1296-slide-products-644b8778a72d0.jpg",
      },
      {
        code: "8CV9Z0",
        product_name: "Nước làm mát GoRacing",
        category_product_id: 1,
        shop_id: 1,
        product_price: "135.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/08/nuoc-lam-mat-goracing-1201-slide-products-5f32533686542.jpg",
      },
      {
        code: "4THECG",
        product_name: "Nhớt chiết lẻ Fuchs Silkolene Pro 4 10W40 XP (100ml)",
        category_product_id: 2,
        shop_id: 1,
        product_price: "30.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-chiet-le-fuchs-silkolene-pro-4-10w40-xp-100ml-1112-slide-products-639fecccdbc57.JPG",
      },
      {
        code: "L3NA7D",
        product_name: "Chai xịt làm sạch dàn nhựa nhám, vỏ lốp xe GoRacing",
        category_product_id: 1,
        shop_id: 1,
        product_price: "89.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/06/chai-xit-lam-sach-dan-nhua-nham-vo-xe-goracing-945-slide-products-62afd2477dc94.jpg",
      },
      {
        code: "M5VOIW",
        product_name: "Chai xịt vệ sinh sên GoRacing",
        category_product_id: 2,
        shop_id: 1,
        product_price: "85.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2018/10/chai-xit-ve-sinh-sen-goracing-857-slide-products-5bcead5ff2d92.JPG",
      },
      {
        code: "D1I8W3",
        product_name: "Chai xịt bôi trơn sên GoRacing",
        category_product_id: 2,
        shop_id: 1,
        product_price: "149.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/06/chai-xit-boi-tron-sen-goracing-848-slide-products-62afd19d513ef.jpg",
      },
      {
        code: "SKSXGA",
        product_name: "Nước làm mát Liqui Moly (loại pha sẵn)",
        category_product_id: 2,
        shop_id: 2,
        product_price: "195.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/nuoc-lam-mat-liqui-moly-loai-pha-san-804-slide-products-6641d00619a8b.png",
      },
      {
        code: "6GOJOT",
        product_name: "Nhớt Shell Advance Ultra Scooter 5W40 1L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "195.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/04/shell-advance-ultra-scooter-5w40-1l-692-slide-products-607cfe77557cd.jpg",
      },
      {
        code: "EATZGQ",
        product_name: "Nhớt Liqui Moly 4T Synth 10W50",
        category_product_id: 2,
        shop_id: 2,
        product_price: "350.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/06/nhot-liqui-moly-4t-synth-10w50-511-slide-products-64883ad738053.jpg",
      },
      {
        code: "OXJFOL",
        product_name: "Phụ gia tăng tốc Liqui Moly Speed Additive",
        category_product_id: 2,
        shop_id: 2,
        product_price: "90.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/phu-gia-tang-toc-liqui-moly-speed-additive-484-slide-products-6641d693937a0.png",
      },
      {
        code: "P6JJMH",
        product_name: "Dầu súc động cơ Liqui Moly Engine Flush",
        category_product_id: 2,
        shop_id: 1,
        product_price: "90.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/dau-suc-dong-co-liqui-moly-engine-flush-483-slide-products-6641d860635e4.jpg",
      },
      {
        code: "XP3UNC",
        product_name: "Nhớt Shell Advance 4T AX7 10W40 Synthetic Based 0.8L",
        category_product_id: 1,
        shop_id: 2,
        product_price: "120.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/02/shell-advance-4t-ax7-10w40-synthetic-based-08l-475-slide-products-62062bbd290ce.jpg",
      },
      {
        code: "7XCM70",
        product_name: "Nhớt Shell Advance 4T AX7 10W40 Synthetic Based 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "130.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-shell-advance-4t-ax7-10w40-synthetic-based-1l-474-slide-products-65d2ce2de1e2d.jpg",
      },
      {
        code: "HSOUC4",
        product_name: "Nhớt Amsoil 10W40 Scooter 4 Stroke 946ml",
        category_product_id: 1,
        shop_id: 1,
        product_price: "225.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-amsoil-10w40-scooter-4-stroke-946ml-365-slide-products-65d2bd992b49e.jpg",
      },
      {
        code: "YZOE6G",
        product_name: "Nhớt Amsoil 10W40 Synthetic Metric 946ml",
        category_product_id: 1,
        shop_id: 1,
        product_price: "335.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-amsoil-10w40-synthetic-metric-946ml-362-slide-products-639fe35a385e3.jpg",
      },
      {
        code: "PQGVD7",
        product_name:
          "Dung dịch vệ sinh buồng đốt Liqui Moly 4T Additive Shooter, Carbon Cleaner",
        category_product_id: 2,
        shop_id: 1,
        product_price: "90.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/02/liqui-moly-4t-additive-shooter-carbon-cleaner-356-slide-products-620766fe175eb.png",
      },
      {
        code: "EEKSB3",
        product_name: "Nhớt Liqui Motorbike 10W40 Formula",
        category_product_id: 2,
        shop_id: 1,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/09/liqui-motorbike-10w40-formula-345-slide-products-5f55a5fa6b03f.jpg",
      },
      {
        code: "GJK8VQ",
        product_name: "Nhớt Liqui Moly Motorbike Scooter 10W40",
        category_product_id: 1,
        shop_id: 2,
        product_price: "230.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/09/liqui-moly-motorbike-scooter-10w40-293-slide-products-5f55a5338a3d6.jpg",
      },
      {
        code: "EABWMN",
        product_name: "Nhớt hộp số Liqui Moly Racing Scooter Gear Oil 150ml",
        category_product_id: 2,
        shop_id: 1,
        product_price: "145.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-hop-so-liqui-moly-racing-scooter-gear-oil-150ml-59-slide-products-639fe56f97cfc.png",
      },
      {
        code: "ELKZEV",
        product_name: "Motul Scooter Gear Plus, Nhớt lap (nhớt hộp số) 120ml",
        category_product_id: 2,
        shop_id: 1,
        product_price: "45.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/motul-scooter-gear-plus-nhot-lap-nhot-hop-so-120ml-38-slide-products-65c05828ab54b.jpg",
      },
      {
        code: "EQ76JJ",
        product_name: "Nhớt Motul Scooter Expert LE 10W40 0.8L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "115.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/10/motul-scooter-expert-le-10w40-08l-37-slide-products-6357a48d1775e.jpg",
      },
      {
        code: "6BYG0K",
        product_name: "Nhớt Motul Scooter Expert LE 10W40 1L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "125.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/04/nhot-motul-scooter-expert-le-10w40-1l-35-slide-products-644b6e46888fa.jpg",
      },
      {
        code: "W9LDJC",
        product_name: "Nhớt Motul Scooter Power LE 5W40 1L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "199.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/03/nhot-motul-scooter-power-le-5w40-1l-33-slide-products-65f7f1afc5298.jpg",
      },
      {
        code: "VNKXUH",
        product_name: "Nhớt Shell Advance AX7 Scooter 10W40 0.8L",
        category_product_id: 1,
        shop_id: 1,
        product_price: "130.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/nhot-shell-advance-ax7-scooter-10w40-08l-32-slide-products-6640864e479c9.png",
      },
      {
        code: "ZS5TZX",
        product_name: "Nhớt Shell Advance AX7 Scooter 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "140.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/nhot-shell-advance-ax7-scooter-10w40-1l-31-slide-products-65d2cf3d0c61f.jpg",
      },
      {
        code: "IDH2D0",
        product_name: "Nhớt Mobil 1 Racing 4T 10W40 1L",
        category_product_id: 2,
        shop_id: 1,
        product_price: "320.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/02/mobil-1-racing-4t-10w40-21-slide-products-65bb196e77d05.png",
      },
      {
        code: "NVV5NM",
        product_name: "Nhớt Liqui Moly Motorbike Street 4T 10W40 1L",
        category_product_id: 2,
        shop_id: 2,
        product_price: "270.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/09/liqui-moly-motorbike-street-4t-10w40-1lit-291-slide-products-5f55a5b2cd553.jpg",
      },
      {
        code: "IA9I1X",
        product_name: "Nhớt Liqui Moly Scooter Race 10W40",
        category_product_id: 2,
        shop_id: 2,
        product_price: "320.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-liqui-moly-scooter-race-10w40-817-slide-products-639fde1b98fc9.jpg",
      },
      {
        code: "JZMAKN",
        product_name: "Nhớt Liqui Scooter Formula 10W40",
        category_product_id: 1,
        shop_id: 2,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/nhot-liqui-scooter-formula-10w40-1853-slide-products-62d3ca38b8c0a.png",
      },
      {
        code: "A0G4VQ",
        product_name: "Nhớt chiết lẻ Motul 300V Factory Line 10W40 (100ml)",
        category_product_id: 2,
        shop_id: 2,
        product_price: "49.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/03/nhot-chiet-le-motul-300v-factory-line-10w40-100ml-1088-slide-products-5e7c1e35b82ac.JPG",
      },
      {
        code: "KV21N5",
        product_name: "Nhớt chiết lẻ Motul H-Tech 100 4T 10W40 (100ml)",
        category_product_id: 1,
        shop_id: 2,
        product_price: "31.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-chiet-le-motul-h-tech-100-4t-10w40-100ml-1089-slide-products-639fd5b3213ad.jpg",
      },
      {
        code: "9WUARZ",
        product_name:
          "Nhớt chiết lẻ Liqui Moly Motorbike Street 4T 10W40 (100ml)",
        category_product_id: 2,
        shop_id: 2,
        product_price: "30.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/12/nhot-chiet-le-liqui-moly-motorbike-street-4t-10w40-100ml-1091-slide-products-639feab016871.JPG",
      },
      {
        code: "CQBAAE",
        product_name: "Nhớt chiết lẻ Repsol Racing 10W40 (100ml)",
        category_product_id: 2,
        shop_id: 2,
        product_price: "32.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/07/nhot-chiet-le-repsol-racing-10w40-100ml-1093-slide-products-62e39849e2a67.png",
      },
      {
        code: "D24BNK",
        product_name: "Nhớt chiết lẻ Wolver Racing Synthetic 10W40 (100ml)",
        category_product_id: 1,
        shop_id: 2,
        product_price: "22.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/09/nhot-chiet-le-wolver-racing-synthetic-10w40-100ml-1094-slide-products-631abce8bbff6.jpg",
      },
      {
        code: "NFAQFV",
        product_name: "Nhớt chiết lẻ Motul 7100 10W50 4T (100ml)",
        category_product_id: 1,
        shop_id: 1,
        product_price: "33.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/01/nhot-chiet-le-motul-7100-10w50-4t-100ml-1095-slide-products-600aa34a01030.jpg",
      },
      {
        code: "LJCJAT",
        product_name: "Nhớt chiết lẻ Shell Advance Ultra 10W40 (100ml)",
        category_product_id: 1,
        shop_id: 1,
        product_price: "29.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/05/nhot-chiet-le-shell-advance-ultra-10w40-100ml-1096-slide-products-60a5c42763234.jpg",
      },
      {
        code: "21I4C6",
        product_name: "Nhớt chiết lẻ Amsoil 10W40 Performance (150ml)",
        category_product_id: 1,
        shop_id: 2,
        product_price: "40.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2019/12/amsoil-10w40-performance-150ml-1097-slide-products-5dff309234ef3.jpg",
      },
      {
        code: "N6KKHD",
        product_name: "Nhớt chiết lẻ Amsoil 10W40 Synthetic Metric (150ml)",
        category_product_id: 1,
        shop_id: 2,
        product_price: "57.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2021/01/nhot-chiet-le-amsoil-10w40-synthetic-metric-150ml-1098-slide-products-600aa302be332.jpg",
      },
      {
        code: "SBYUJP",
        product_name: "Vệ sinh nồi xe tay ga Honda, Yamaha",
        category_product_id: 1,
        shop_id: 2,
        product_price: "100.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/08/ve-sinh-noi-xe-tay-ga-1362-slide-products-63044cd0b91ad.jpg",
      },
      {
        code: "EBIGTD",
        product_name: "Gói bảo dưỡng xe tay ga",
        category_product_id: 1,
        shop_id: 2,
        product_price: "150.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/10/goi-bao-duong-xe-tay-ga-1363-slide-products-5f8fefb4e6f9d.jpg",
      },
      {
        code: "LSTJVV",
        product_name: "Gói bảo dưỡng xe máy số, xe côn tay",
        category_product_id: 1,
        shop_id: 2,
        product_price: "125.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/01/goi-bao-duong-xe-may-so-xe-con-tay-1364-slide-products-63c1293a42260.jpg",
      },
      {
        code: "CZTLIE",
        product_name: "Vệ sinh họng xăng và kim phun xăng",
        category_product_id: 1,
        shop_id: 2,
        product_price: "250.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/10/ve-sinh-hong-xang-va-kim-phun-xang-1365-slide-products-5f91384ec9b6f.jpg",
      },
      {
        code: "FGFROT",
        product_name: "Khắc phục lỗi vô nước đồng hồ Vario",
        category_product_id: 2,
        shop_id: 1,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/10/khac-phuc-loi-vo-nuoc-dong-ho-vario-1368-slide-products-5f9923a4e0b2f.jpg",
      },
      {
        code: "YR4DLJ",
        product_name: "Vệ sinh kim phun xăng điện tử Fi",
        category_product_id: 1,
        shop_id: 1,
        product_price: "90.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/11/ve-sinh-kim-phun-xang-dien-tu-fi-1373-slide-5fa385ef2e8d4.jpg",
      },
      {
        code: "NNKGTJ",
        product_name: "Thay chén cổ xe máy Honda",
        category_product_id: 1,
        shop_id: 1,
        product_price: "300.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/11/thay-chen-co-xe-may-honda-1375-slide-5fa8f05324076.jpg",
      },
      {
        code: "QHC6DI",
        product_name: "Thay chén cổ xe máy Yamaha",
        category_product_id: 1,
        shop_id: 1,
        product_price: "350.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/11/thay-chen-co-xe-may-yamaha-1376-slide-5fa8f967794a1.jpg",
      },
      {
        code: "2Y2LFQ",
        product_name: "Thay chén cổ Honda Sonic 150",
        category_product_id: 2,
        shop_id: 2,
        product_price: "500.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2020/11/thay-chen-co-honda-sonic-150-1391-slide-5fc07e35cba3c.jpg",
      },
      {
        code: "31Q2XV",
        product_name: "Vệ sinh heo dầu cho xe 2 thắng đĩa",
        category_product_id: 2,
        shop_id: 2,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/07/ve-sinh-bo-thang-heo-dau-cho-xe-2-dia-2165-slide-64b10b9a32cd6.jpg",
      },
      {
        code: "HARVEQ",
        product_name: "Vệ sinh heo dầu cho xe 1 thắng đĩa",
        category_product_id: 1,
        shop_id: 2,
        product_price: "150.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/07/ve-sinh-bo-thang-heo-dau-cho-xe-1-dia-2166-slide-64b10c687623c.jpg",
      },
      {
        code: "X6VATM",
        product_name: "Vệ sinh, làm nhẹ dây ga, dây côn",
        category_product_id: 2,
        shop_id: 1,
        product_price: "150.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/07/ve-sinh-lam-nhe-day-ga-day-con-2167-slide-64b245a3459db.png",
      },
      {
        code: "POWZWR",
        product_name: "Gói bảo dưỡng xe tay ga nâng cao",
        category_product_id: 1,
        shop_id: 1,
        product_price: "450.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/07/goi-bao-duong-xe-tay-ga-nang-cao-2168-slide-products-64b26c3f864b4.jpg",
      },
      {
        code: "WGNFTG",
        product_name: "Gói bảo dưỡng xe số, xe côn tay nâng cao",
        category_product_id: 1,
        shop_id: 2,
        product_price: "400.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/07/goi-bao-duong-xe-so-xe-con-tay-nang-cao-2169-slide-64b273e41eb02.jpg",
      },
      {
        code: "MT3TET",
        product_name: "Chai xịt sên GoRacing",
        category_product_id: 1,
        shop_id: 2,
        product_price: "149.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/06/chai-xit-sen-goracing-638-slide-products-62afd0fcc355d.jpg",
      },
      {
        code: "WONUUW",
        product_name: "Súc động cơ Wolver Motor Flush Adapter 80ml",
        category_product_id: 1,
        shop_id: 2,
        product_price: "35.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/08/suc-dong-co-wolver-motor-flush-adapter-80ml-2186-slide-products-64e42a0d4daa5.png",
      },
      {
        code: "ZFUVNM",
        product_name: "Súc động cơ Motul Engine Clean Moto 200ml",
        category_product_id: 1,
        shop_id: 2,
        product_price: "140.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/08/suc-dong-co-motul-engine-clean-moto-200ml-2187-slide-products-64e469c5875d7.png",
      },
      {
        code: "LLHTK1",
        product_name: "Thay chén cổ xe PCX",
        category_product_id: 1,
        shop_id: 1,
        product_price: "400.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/08/thay-chen-co-xe-pcx-2188-slide-64e478b438ad7.jpg",
      },
      {
        code: "8GWLPW",
        product_name: "Vệ sinh phun xăng Motul Fuel System Clean Moto 200ml",
        category_product_id: 1,
        shop_id: 2,
        product_price: "150.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/08/ve-sinh-phun-xang-motul-fuel-system-clean-moto-200ml-2189-slide-products-64e584faa2987.png",
      },
      {
        code: "GUD07I",
        product_name: "Vệ sinh họng xăng cho xe Honda, Yamaha",
        category_product_id: 1,
        shop_id: 2,
        product_price: "200.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/08/ve-sinh-hong-xang-cho-xe-honda-yamaha-2197-slide-64f0a9d7255b4.jpg",
      },
      {
        code: "J4KML3",
        product_name: "Công thay lọc xăng xe Honda Fi, Yamaha Fi",
        category_product_id: 1,
        shop_id: 2,
        product_price: "100.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/09/cong-thay-loc-xang-xe-honda-fi-yamaha-fi-2198-slide-64f6e8f307f87.jpg",
      },
      {
        code: "GCPYFI",
        product_name: "Phụ gia pha nhớt Liqui Moly MO S2",
        category_product_id: 2,
        shop_id: 2,
        product_price: "90.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2024/05/phu-gia-pha-nhot-liqui-moly-mo-s2-673-slide-products-664221c4d6207.png",
      },
      {
        code: "B4XFMH",
        product_name: "Nhớt Liqui Molygen Scooter 10W40",
        category_product_id: 2,
        shop_id: 1,
        product_price: "300.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2023/06/nhot-liqui-molygen-scooter-10w40-1974-slide-products-64883b1587e10.jpg",
      },
      {
        code: "AHY3DO",
        product_name: "Nước rửa xe bảo vệ màu sơn Sumo",
        category_product_id: 1,
        shop_id: 1,
        product_price: "75.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/08/nuoc-rua-xe-bao-ve-mau-son-sumo-743-slide-products-62f5e09f4c5ab.jpg",
      },
      {
        code: "KQKQEW",
        product_name: "Dịch vụ vệ sinh nhông sên dĩa",
        category_product_id: 1,
        shop_id: 2,
        product_price: "60.000₫",
        product_brand: "Honda",
        product_quantity: 99,
        product_image_url:
          "https://shop2banh.vn/images/thumbs/2022/05/ve-sinh-nhong-sen-dia-1768-slide-products-62909e1394646.jpg",
      },
    ];
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
