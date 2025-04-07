# Cara Detail Push Kode ke GitHub Menggunakan PowerShell (Windows)

Berikut adalah langkah-langkah konkrit untuk melakukan push ke GitHub yang bisa Anda jadikan catatan untuk penggunaan di masa mendatang:

## Persiapan (Hanya Perlu Dilakukan Sekali)

1. **Pastikan Git telah terinstal**
   - Periksa apakah Git terinstal dengan menjalankan: `git --version`
   - Jika perintah tidak ditemukan, berarti Git belum terinstal atau tidak di PATH

2. **Jika Git tidak ditemukan, gunakan jalur lengkap**
   - Di Windows, Git biasanya terinstal di: `C:\Program Files\Git\cmd\git.exe`
   - Anda dapat menggunakan jalur lengkap ini untuk menjalankan perintah Git

3. **Buat Personal Access Token (PAT) di GitHub** (disarankan)
   - Buka GitHub > Settings > Developer Settings > Personal Access Tokens
   - Generate token baru dengan izin 'repo'
   - Salin token yang dihasilkan (Anda tidak akan bisa melihatnya lagi)

## Langkah-Langkah Push ke GitHub

1. **Buka PowerShell atau Command Prompt**

2. **Arahkan ke direktori proyek**
   ```powershell
   cd "Path\Ke\Proyek\Anda"
   # Contoh: cd "D:\Bisnis akbar\PT. ISA TECHNOLOGY\HeyTML\retro90s-birthday-card"
   ```

3. **Inisialisasi repositori Git** (hanya untuk proyek baru)
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" init
   ```

4. **Tambahkan semua file ke staging area**
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" add .
   ```

5. **Commit perubahan dengan pesan**
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" commit -m "Pesan commit Anda"
   # Contoh: & "C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit"
   ```

6. **Ubah nama branch default menjadi 'main'** (praktik terbaik)
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" branch -M main
   ```

7. **Tambahkan remote repository dengan PAT**
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" remote add origin https://username:token@github.com/username/nama-repo.git
   # Contoh: & "C:\Program Files\Git\cmd\git.exe" remote add origin https://hanyacintadanmalam:ghp_abc123@github.com/hanyacintadanmalam/PRODUCT1.git
   ```

   Atau jika remote sudah ada, ganti URL-nya:
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" remote set-url origin https://username:token@github.com/username/nama-repo.git
   ```

8. **Push ke GitHub**
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" push -u origin main
   ```

## Contoh Lengkap untuk Proyek Baru

```powershell
# 1. Arahkan ke direktori proyek
cd "D:\Bisnis akbar\PT. ISA TECHNOLOGY\HeyTML\retro90s-birthday-card"

# 2. Inisialisasi repositori Git
& "C:\Program Files\Git\cmd\git.exe" init

# 3. Tambahkan semua file
& "C:\Program Files\Git\cmd\git.exe" add .

# 4. Commit perubahan
& "C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit"

# 5. Ubah nama branch jadi main
& "C:\Program Files\Git\cmd\git.exe" branch -M main

# 6. Tambahkan remote dengan token
& "C:\Program Files\Git\cmd\git.exe" remote add origin https://username:token@github.com/username/nama-repo.git

# 7. Push ke GitHub
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
```

## Untuk Update/Perubahan Selanjutnya

```powershell
# 1. Arahkan ke direktori proyek
cd "D:\Bisnis akbar\PT. ISA TECHNOLOGY\HeyTML\retro90s-birthday-card"

# 2. Tambahkan perubahan
& "C:\Program Files\Git\cmd\git.exe" add .

# 3. Commit perubahan
& "C:\Program Files\Git\cmd\git.exe" commit -m "Update fitur XYZ"

# 4. Push ke GitHub
& "C:\Program Files\Git\cmd\git.exe" push
```

## Catatan Penting
1. **Keamanan Token**: Jangan bagikan token dengan orang lain dan jangan menyimpannya di repositori publik
2. **Refresh Token**: Jika token kedaluwarsa, buat token baru dan update remote URL
3. **Path Git**: Sesuaikan jalur ke git.exe dengan lokasi instalasi Git Anda
4. **Akun GitHub**: Pastikan Anda menggunakan username dan token yang benar

Dengan langkah-langkah ini, Anda seharusnya bisa push kode ke GitHub dengan sukses meskipun mengalami masalah dengan command Git biasa.

## Mengirim Perubahan Lokal ke GitHub

Saat Anda membuat perubahan pada kode di localhost (komputer lokal Anda), berikut langkah-langkah untuk mengirim perubahan tersebut ke GitHub:

### 1. Lihat Status Perubahan

Periksa file mana saja yang telah diubah:

```powershell
& "C:\Program Files\Git\cmd\git.exe" status
```

Perintah ini akan menampilkan daftar file yang dimodifikasi, ditambahkan, atau dihapus.

### 2. Tambahkan Perubahan ke Staging Area

Anda bisa menambahkan semua perubahan sekaligus:

```powershell
& "C:\Program Files\Git\cmd\git.exe" add .
```

Atau menambahkan file tertentu saja:

```powershell
& "C:\Program Files\Git\cmd\git.exe" add path/ke/file/yang/diubah.js
```

### 3. Commit Perubahan

Buat commit dengan pesan yang menjelaskan perubahan apa yang telah Anda lakukan:

```powershell
& "C:\Program Files\Git\cmd\git.exe" commit -m "Deskripsi perubahan yang dilakukan"
```

Contoh pesan commit yang baik:
- "Memperbaiki bug pada halaman login"
- "Menambahkan fitur kartu ucapan baru"
- "Mengubah tampilan menu navigasi"

### 4. Push Perubahan ke GitHub

Kirim commit Anda ke repositori GitHub:

```powershell
& "C:\Program Files\Git\cmd\git.exe" push
```

Jika ini adalah push pertama atau branch baru:

```powershell
& "C:\Program Files\Git\cmd\git.exe" push -u origin nama_branch
```

### Contoh Lengkap Alur Kerja Perubahan

```powershell
# 1. Arahkan ke direktori proyek
cd "D:\Bisnis akbar\PT. ISA TECHNOLOGY\HeyTML\retro90s-birthday-card"

# 2. Periksa status perubahan
& "C:\Program Files\Git\cmd\git.exe" status

# 3. Tambahkan perubahan
& "C:\Program Files\Git\cmd\git.exe" add .

# 4. Commit perubahan
& "C:\Program Files\Git\cmd\git.exe" commit -m "Mengubah tampilan kartu ucapan"

# 5. Push ke GitHub
& "C:\Program Files\Git\cmd\git.exe" push
```

### Menangani Konflik

Jika GitHub menolak push Anda karena ada perubahan di remote yang belum Anda miliki:

1. Ambil perubahan terbaru dari GitHub:
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" pull
   ```

2. Selesaikan konflik yang muncul (jika ada)
   - Git akan menandai file dengan konflik
   - Buka file tersebut dan edit manual untuk menyelesaikan konflik
   - Simpan file setelah konflik diselesaikan

3. Tambahkan file yang sudah diselesaikan konfliknya:
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" add .
   ```

4. Commit penyelesaian konflik:
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" commit -m "Menyelesaikan konflik merge"
   ```

5. Push kembali perubahan Anda:
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" push
   ``` 