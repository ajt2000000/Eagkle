        window.addEventListener('load', () => {
            let deferredPrompt;
            const installButton = document.getElementById('installButton');

            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                installButton.style.display = 'block';

                installButton.addEventListener('click', () => {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the A2HS prompt');
                            setTimeout(() => {
                              if(!alert("インストールが完了しました。サイトを閉じてください。")){
                                window.close();
                              }
                            }, 1000);
                        } else {
                            console.log('User dismissed the A2HS prompt');
                        }
                        deferredPrompt = null;
                    });
                });
            });
        });
window.onload = function () {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}
