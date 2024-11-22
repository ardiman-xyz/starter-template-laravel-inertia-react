<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cetak laporan</title>

    @vite("resources/css/app.css")
</head>
<body>

    <main class="container mx-auto max-w-5xl h-screen font-albert">
        <header class="w-full h-[123px] bg-gradient-to-t from-gray-200 via-gray-50 to-gray-white p-4 items-center flex justify-between">
           <div>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>

            <div class="mt-2">
             <h1 class="text-2xl font-bold ">Laporan Supervisi </h1>
             <p class="text-gray-700 text-sm">sispeng.id</p>
            </div>
           </div>
           <div>
            <p class="text-xs text-gray-600">Tanggal cetak: 25 September 2024</p>

            <div class="mt-4 text-xs flex flex-col gap-y-1 text-gray-600">
                <p>Alamat: jln. jati raya 55, kendari</p>
                <p>Email: sd15kendari@school.id</p>
                <p>No. HP: 082345545375</p>
            </div>
           </div>

        </header>
        <div class="mt-10">

            <table class="w-full bg-white border text-sm">
                <thead>
                    <tr class="">
                        <th class="px-3 py-1 border">No</th>
                        <th class="px-3 py-1 border">Komponen</th>
                        <th class="px-3 py-1 border">Nilai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="">
                        <td class="px-3 py-1 border text-center">1</td>
                        <td class="px-3 py-1 border">Pra Observasi</td>
                        <td class="px-3 py-1 border text-center">89</td>
                    </tr>
                    <tr class="">
                        <td class="px-3 py-1 border text-center">2</td>
                        <td class="px-3 py-1 border"> Observasi</td>
                        <td class="px-3 py-1 border text-center">89</td>
                    </tr>
                    <tr class="">
                        <td class="px-3 py-1 border text-center">3</td>
                        <td class="px-3 py-1 border">Pasca Observasi</td>
                        <td class="px-3 py-1 border text-center">89</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <div className="bg-gray-100 p-4 rounded-lg mt-10">
                <h2 className="text-xl font-semibold mb-4">Penilaian Akhir</h2>
                <p className="mb-2"><strong>Nilai Rata-rata:</strong> 86.25</p>
                <p className="mb-2"><strong>Kategori:</strong> Sangat Baik</p>
                <br>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Catatan dan Rekomendasi:</h3>
                  <p className="text-sm">
                    Berdasarkan hasil supervisi, guru menunjukkan kinerja yang Sangat Baik.
                    Direkomendasikan untuk terus meningkatkan kualitas pembelajaran dan mengikuti pelatihan pengembangan profesi secara berkala.
                  </p>
                </div>
              </div>
        </div>
    </main>

</body>
</html>
