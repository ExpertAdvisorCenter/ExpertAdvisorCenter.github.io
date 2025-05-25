function showContent(section) {
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(section).classList.remove('hidden');
            
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth <= 768) { 
                sidebar.classList.add('-translate-x-full');
            }
        }

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const sidebar = document.querySelector('.sidebar');

        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

