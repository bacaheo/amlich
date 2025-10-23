document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const langToggleText = document.getElementById('langToggleText');
    const languageElements = Array.from(document.querySelectorAll('.language-content'));
    const supportedLanguages = ['en', 'vi'];
    let currentLanguage = 'en';

    const readStoredLanguage = () => {
        try {
            const stored = window.localStorage.getItem('amlich-preferred-language');
            if (supportedLanguages.includes(stored)) {
                return stored;
            }
        } catch (error) {
            // Ignore storage access issues (privacy mode, etc.)
        }
        return 'en';
    };

    const storeLanguage = (lang) => {
        try {
            window.localStorage.setItem('amlich-preferred-language', lang);
        } catch (error) {
            // Ignore storage access issues
        }
    };

    const updatePageLanguage = (lang) => {
        currentLanguage = supportedLanguages.includes(lang) ? lang : 'en';

        languageElements.forEach((element) => {
            const elementLanguage = element.getAttribute('data-lang');
            const shouldShow = elementLanguage === currentLanguage;
            element.classList.toggle('hidden', !shouldShow);
        });

        langToggleText.textContent = currentLanguage === 'vi' ? 'VI' : 'EN';
        document.documentElement.setAttribute('lang', currentLanguage === 'vi' ? 'vi' : 'en');
        storeLanguage(currentLanguage);

        langToggle.setAttribute(
            'aria-label',
            currentLanguage === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'
        );
    };

    const initialLanguage = readStoredLanguage();
    updatePageLanguage(initialLanguage);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLanguage = currentLanguage === 'en' ? 'vi' : 'en';
            updatePageLanguage(nextLanguage);
        });
    }

    const showCopyFeedback = (lang) => {
        const message = lang === 'vi' ? 'Đã sao chép vào clipboard!' : 'Copied to clipboard!';
        const existing = document.querySelector('.copied-feedback');

        if (existing) {
            existing.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = 'copied-feedback';
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        feedback.textContent = message;
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.classList.add('hiding');
            feedback.addEventListener(
                'animationend',
                () => {
                    feedback.remove();
                },
                { once: true }
            );
        }, 1800);
    };

    const handleCopyClick = async (event) => {
        const button = event.currentTarget;
        const code = button.getAttribute('data-code');

        if (!code) {
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(code);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = code;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            showCopyFeedback(currentLanguage);
        } catch (error) {
            console.error('Clipboard error:', error);
        }
    };

    document.querySelectorAll('.copy-btn').forEach((button) => {
        button.addEventListener('click', handleCopyClick);
    });
});
