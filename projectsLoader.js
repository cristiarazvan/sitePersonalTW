async function loadProjects() {
    try {
        const response = await fetch("projects.json");
        const data = await response.json();
        const projectsGrid = document.getElementById("projectsGrid");

        data.projects.forEach((project) => {
            const projectCard = document.createElement("div");
            projectCard.className = "card";

            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="card-content">
                    <h2 class="card-title">${project.title}</h2>
                    <div class="card-class">${project.class}</div>
                    <p class="project-description">${project.description}</p>
                    <div class="languages-container">
                        ${project.languages
                            .map(
                                (lang) =>
                                    `<span class="language-tag">${lang}</span>`
                            )
                            .join("")}
                    </div>
                    <a href="${project.github}" class="github-btn">
                        <i class="fab fa-github"></i>View on GitHub
                    </a>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadProjects);
