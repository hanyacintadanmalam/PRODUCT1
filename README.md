# Retro 90s Birthday Card

Aplikasi kartu ucapan ulang tahun dengan tampilan retro Windows 95 yang dibuat dengan Next.js.

## Fitur

- Kartu ucapan digital dengan tampilan Windows 95
- Music Player dengan lagu ulang tahun
- Gallery Viewer dengan slideshow foto dan video
- Animasi tiup lilin kue ulang tahun
- Program tambahan seperti Notepad dan Party Mode

## Pengaturan Media untuk Gallery

Untuk menggunakan fitur Gallery, letakkan file foto dan video di folder berikut:

```
retro90s-birthday-card/public/gallery/
```

Nama file yang digunakan dalam aplikasi:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- video1.mp4

Anda dapat mengganti file-file ini dengan foto dan video Anda sendiri, pastikan menggunakan nama file yang sama.

## Pengaturan Audio

Untuk musik ulang tahun, letakkan file audio di folder berikut:

```
retro90s-birthday-card/public/audio/birthday-song.mp3
```

## Cara Menjalankan

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Menggunakan URL Parameter

Anda dapat menyesuaikan kartu dengan parameter URL:

- `untuk` - Nama penerima kartu
- `dari` - Nama pengirim kartu
- `umur` - Umur yang dirayakan
- `pesan` - Pesan ulang tahun khusus

Contoh: `http://localhost:3000/?untuk=Budi&dari=Ani&umur=30&pesan=Selamat%20ulang%20tahun%20sahabatku!`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   P R O D U C T 1  
 