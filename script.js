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
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('show');
        }
    });
    
    // Code Tabs Functionality
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeContents = document.querySelectorAll('.code-content');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            codeContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-code`).classList.add('active');
        });
    });
    
    // Extract and display code
    const htmlContentEl = document.getElementById('html-content');
    const cssContentEl = document.getElementById('css-content');
    const jsContentEl = document.getElementById('js-content');

    // Display HTML
    if (htmlContentEl) {
        // Create a formatted version of the current page's HTML
        const cleanHtml = document.documentElement.outerHTML;
        htmlContentEl.querySelector('pre').textContent = cleanHtml;
    }

    // Fetch and display CSS from the external file
    if (cssContentEl) {
        fetch('style.css')
            .then(response => response.text())
            .then(text => {
                cssContentEl.querySelector('pre').textContent = text;
            })
            .catch(err => {
                console.error('Error fetching CSS:', err);
                cssContentEl.querySelector('pre').textContent = '/* Could not load style.css */';
            });
    }

    // Fetch and display JS from the external file
    if (jsContentEl) {
        fetch('script.js')
            .then(response => response.text())
            .then(text => {
                jsContentEl.querySelector('pre').textContent = text;
            })
            .catch(err => {
                console.error('Error fetching JavaScript:', err);
                jsContentEl.querySelector('pre').textContent = '// Could not load script.js';
            });
    }
});

// Copy code function
function copyCode(elementId) {
    const preElement = document.getElementById(elementId).querySelector('pre');
    const textToCopy = preElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyBtn = document.getElementById(elementId).querySelector('.copy-btn');
        const originalContent = copyBtn.innerHTML;
        copyBtn.textContent = 'Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
