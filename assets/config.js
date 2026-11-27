// Course settings. Edit these as the Canvas shell and videos become available.
// This file is how the site connects to Canvas: each module's "Submit in Canvas" button opens submitUrl[N].
window.COURSE = {
  title: "Healthcare Information Systems",
  // Canvas course number goes in these links. Until Brad sends it, the buttons stay hidden.
  canvasCourse: "132848",
  // Lecture video for each module (an .mp4 in assets/videos/ or an embed link). Empty = placeholder box.
  videoUrl: {},
  // Other videos, such as the Start Here welcome video and cast videos.
  extraVideos: { welcome: "", m2_thielen: "", m4_oltmanns: "", m7_schaefer: "", m9_tran: "", m9_dietrich: "" },
  // Canvas assignment link for each module (1 to 12) and the final presentation ("final").
  // For now each points to the course Modules page; swap in the exact assignment links once they exist.
  submitUrl: { 1: "https://canvas.iastate.edu/courses/132848/assignments/2964826", 2: "https://canvas.iastate.edu/courses/132848/assignments/2964827", 3: "https://canvas.iastate.edu/courses/132848/assignments/2964828", 4: "https://canvas.iastate.edu/courses/132848/assignments/2964829", 5: "https://canvas.iastate.edu/courses/132848/assignments/2964830", 6: "https://canvas.iastate.edu/courses/132848/assignments/2964831", 7: "https://canvas.iastate.edu/courses/132848/assignments/2964832", 8: "https://canvas.iastate.edu/courses/132848/assignments/2964833", 9: "https://canvas.iastate.edu/courses/132848/assignments/2964834", 10: "https://canvas.iastate.edu/courses/132848/assignments/2964835", 11: "https://canvas.iastate.edu/courses/132848/assignments/2964836", 12: "https://canvas.iastate.edu/courses/132848/assignments/2964837", final: "https://canvas.iastate.edu/courses/132848/assignments/2964838" }
};
