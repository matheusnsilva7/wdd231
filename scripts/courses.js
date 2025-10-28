const coursesListEl = document.getElementById("coursesList");
const creditsValueEl = document.getElementById("creditsValue");
const filterBtns = document.querySelectorAll(".filter-btn");

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

function renderCourses(filter = "all") {
  if (!coursesListEl) return;

  const filtered = courses.filter((c) => {
    if (filter === "all") return true;
    return c.subject.toLocaleLowerCase() === filter;
  });

  coursesListEl.innerHTML = "";

  if (filtered.length === 0) {
    coursesListEl.innerHTML = "<p>No courses to display.</p>";
    creditsValueEl.textContent = "0";
    return;
  }

  filtered.forEach((c) => {
    const item = document.createElement("div");
    item.className = "course-item" + (c.completed ? " completed" : "");
    item.setAttribute("tabindex", "0");
    item.innerHTML = `
        <div class="course-info">
          <strong>${
            c.title
          }</strong><div class="muted">${c.subject.toUpperCase()}</div>
        </div>
        <div class="course-meta">
          ${c.completed ? '<span class="sr-only"> Completed</span>' : ""}
        </div>
      `;
    coursesListEl.appendChild(item);
  });

  const totalCredits = filtered.reduce(
    (sum, cur) => sum + (cur.credits || 0),
    0
  );
  creditsValueEl.textContent = String(totalCredits);
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = btn.dataset.filter;
    renderCourses(filter === "all" ? "all" : filter === "cse" ? "cse" : "wdd");

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

renderCourses("all");

const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]');
if (defaultBtn) defaultBtn.classList.add("active");
