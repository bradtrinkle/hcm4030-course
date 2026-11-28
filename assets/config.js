// Course settings. Edit these as the Canvas shell and videos become available.
// This file is how the site connects to Canvas: each module's "Submit in Canvas" button opens submitUrl[N].
window.COURSE = {
  title: "Healthcare Information Systems",
  // Canvas course number goes in these links. Until Brad sends it, the buttons stay hidden.
  canvasCourse: "132848",
  // Lecture video for each module (an .mp4 in videos/ or an embed link). Empty = placeholder box.
  videoUrl: { 1: "videos/lecture-m1.mp4", 2: "videos/lecture-m2.mp4", 3: "videos/lecture-m3.mp4", 4: "videos/lecture-m4.mp4", 5: "videos/lecture-m5.mp4", 6: "videos/lecture-m6.mp4", 7: "videos/lecture-m7.mp4", 8: "videos/lecture-m8.mp4", 9: "videos/lecture-m9.mp4", 10: "videos/lecture-m10.mp4", 11: "videos/lecture-m11.mp4", 12: "videos/lecture-m12.mp4" },
  // Other videos, such as the Start Here welcome video and cast videos.
  extraVideos: { welcome: "videos/welcome.mp4", m1_hemmingsen: "videos/m1_hemmingsen.mp4", m2_thielen: "videos/m2_thielen.mp4", m4_oltmanns: "videos/m4_oltmanns.mp4", m7_schaefer: "videos/m7_schaefer.mp4", m9_tran: "videos/m9_tran.mp4", m9_dietrich: "videos/m9_dietrich.mp4", m5_halvorsen: "videos/m5_halvorsen.mp4", m5_sievers: "videos/m5_sievers.mp4", m5_kuehl: "videos/m5_kuehl.mp4", m5_brandt: "videos/m5_brandt.mp4", m5_morales: "videos/m5_morales.mp4", m5_hoffmeyer: "videos/m5_hoffmeyer.mp4", m5_walter: "videos/m5_walter.mp4", m5_beth: "videos/m5_beth.mp4" },
  // Canvas assignment link for each module (1 to 12) and the final presentation ("final").
  // For now each points to the course Modules page; swap in the exact assignment links once they exist.
  submitUrl: { 1: "https://canvas.iastate.edu/courses/132848/assignments/2964826", 2: "https://canvas.iastate.edu/courses/132848/assignments/2964827", 3: "https://canvas.iastate.edu/courses/132848/assignments/2964828", 4: "https://canvas.iastate.edu/courses/132848/assignments/2964829", 5: "https://canvas.iastate.edu/courses/132848/assignments/2964830", 6: "https://canvas.iastate.edu/courses/132848/assignments/2964831", 7: "https://canvas.iastate.edu/courses/132848/assignments/2964832", 8: "https://canvas.iastate.edu/courses/132848/assignments/2964833", 9: "https://canvas.iastate.edu/courses/132848/assignments/2964834", 10: "https://canvas.iastate.edu/courses/132848/assignments/2964835", 11: "https://canvas.iastate.edu/courses/132848/assignments/2964836", 12: "https://canvas.iastate.edu/courses/132848/assignments/2964837", final: "https://canvas.iastate.edu/courses/132848/assignments/2964838" }
};
