export function trackPreviewClick(projectName, projectUrl) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag("event", "preview_click", {
            project_name: projectName,
            project_url: projectUrl,
        })
    }
}