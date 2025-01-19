async function calculateSkillPercentages() {
    try {
        const response = await fetch("projects.json");
        const data = await response.json();

        const languageCounts = {};
        data.projects.forEach((project) => {
            project.languages.forEach((lang) => {
                languageCounts[lang] = (languageCounts[lang] || 0) + 1;
            });
        });

        const maxCount = Math.max(...Object.values(languageCounts));

        const percentages = {};
        Object.entries(languageCounts).forEach(([lang, count]) => {
            percentages[lang] = Math.round((count / maxCount) * 100);
        });

        const root = document.documentElement;
        for (const [lang, percentage] of Object.entries(percentages)) {
            let cssVar = lang
                .toLowerCase()
                .replace("c++", "c-plus-plus")
                .replace("#", "sharp");

            cssVar = `--skill-${cssVar}`;
            root.style.setProperty(cssVar, `${percentage}%`);

            const percentageElement = document.querySelector(
                `[data-skill="${lang}"]`
            );
            if (percentageElement) {
                percentageElement.textContent = `${percentage}%`;
            }
        }
    } catch (error) {
        console.error("Error calculating skill percentages:", error);
    }
}

document.addEventListener("DOMContentLoaded", calculateSkillPercentages);
