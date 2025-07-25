 // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('nav ul');
            
            mobileMenuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('show');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navMenu.contains(event.target);
                const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnMenuBtn && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            });
            
            // Code Tabs Functionality
            const codeTabs = document.querySelectorAll('.code-tab');
            const codeContents = document.querySelectorAll('.code-content');
            
            codeTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    codeTabs.forEach(t => t.classList.remove('active'));
                    codeContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    const tabId = tab.getAttribute('data-tab');
                    document.getElementById(`${tabId}-code`).classList.add('active');
                });
            });
            
            // Extract and display code
            const htmlContent = document.getElementById('html-content');
            const cssContent = document.getElementById('css-content');
            const jsContent = document.getElementById('js-content');
            
            // Extract HTML structure (without style and script tags)
            const htmlStructure = document.documentElement.outerHTML
                .replace(/<style[\s\S]*?<\/style>/gi, '<!-- CSS styles removed for clarity -->')
                .replace(/<script[\s\S]*?<\/script>/gi, '<!-- JavaScript removed for clarity -->');
            
            htmlContent.textContent = htmlStructure;
            
            // Extract CSS
            const styleTag = document.querySelector('style');
            if (styleTag) {
                cssContent.textContent = styleTag.textContent;
            }
            
            // Extract JavaScript
            const scriptTags = document.querySelectorAll('script');
            let jsCode = '';
            scriptTags.forEach(script => {
                if (!script.src && script.textContent.trim() !== '') {
                    jsCode += script.textContent + '\n\n';
                }
            });
            jsContent.textContent = jsCode || '// No JavaScript found';
        });
        
        // Copy code function
        function copyCode(elementId) {
            const codeElement = document.getElementById(elementId).querySelector('pre');
            const textToCopy = codeElement.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const copyBtn = document.getElementById(elementId).querySelector('.copy-btn');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        ${originalText.replace('Copied!', '')}
                    `;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy code. Please try again.');
            });
        }
    

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'964cae2642c4cf00',t:'MTc1MzQ1NzIzNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
