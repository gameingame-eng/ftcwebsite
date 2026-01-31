function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

async function loadCodeExamples() {
    const container = document.getElementById('code-examples');
    const noFilesMessage = document.getElementById('no-files-message');

    try {
        // Use the path where the files actually live
        const listResponse = await fetch('/programming/codex/list.json');
        if (!listResponse.ok) throw new Error('Could not find list.json');
        
        const files = await listResponse.json();
        
        container.innerHTML = '';
        noFilesMessage.style.display = 'none';

        for (const fileName of files) {
            const fileResponse = await fetch(`/programming/codex/${fileName}`);
            const content = await fileResponse.text();

            const codeBlock = document.createElement('div');
            // 'reveal' is kept here for your animation script
            codeBlock.className = 'reveal bg-citrix-light/50 rounded-xl border border-gray-700 overflow-hidden mb-6';
            codeBlock.innerHTML = `
                <div class="bg-citrix-dark/70 px-6 py-4 border-b border-gray-600 flex items-center justify-between">
                    <h3 class="font-bold text-lg text-citrix-accent flex items-center gap-2">
                        <i class="fas fa-file-code"></i> ${fileName}
                    </h3>
                    <a href="/programming/codex/${fileName}" download class="text-gray-400 hover:text-citrix-accent transition-colors">
                        <i class="fas fa-download"></i>
                    </a>
                </div>
                <div class="p-6 code-block">
                    <pre><code class="language-java">${escapeHtml(content)}</code></pre>
                </div>
            `;
            container.appendChild(codeBlock);
        }

        // --- Post-Loading Tasks ---

        // 1. Re-run Highlight.js
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
        
        // 2. Re-trigger the reveal animation
        if (typeof revealObserver !== 'undefined') {
            document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
        } else if (window.sr) {
            sr.reveal('.reveal');
        } else if (typeof reveal === 'function') {
            reveal();
        } else {
            // Brute force: make sure they show up if the observer fails
            document.querySelectorAll('.reveal').forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });
        }

    } catch (err) {
        console.error('Error:', err);
        if (noFilesMessage) noFilesMessage.style.display = 'block';
    }
}