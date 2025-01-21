//Objet application : définir méthodes propriétés
const app = {
    contentElement: document.getElementById('content'),
    cachePages: new Map(),
    defaultPage: 'home',
};

//Méthode d'initialisation de l'application
app.init = () => {
    //initialisation du schema de la DBB
    db.init();
    location.href = `#${app.defaultPage}`;
    app.loadPage(app.defaultPage);
    app.activePage(app.defaultPage);
    //event listener qui écoute les changement d'URL
    window.addEventListener('hashchange', (element) => {
        //On passe la nouvelle URL à la classe URL en javascript pour qu'il vienne la décomposer
        const url = new URL(element.newURL);
        //On retire le dièse du hash pour avoir la valeur
        const hash = url.hash.replace('#', '');
        app.loadPage(hash);
        app.activePage(hash);
    })
}

app.activePage = (pageName) => {
    const activeElement = document.querySelector('a.active');
    if (activeElement) {
        document.querySelector('a.active').classList.remove('active');
    }

    document.querySelector(`[href='#${pageName}']`).classList.add('active');

    
}

app.loadPage = async (pageName) => {
    if(app.cachePages.has(pageName)){
        app.contentElement.innerHTML = app.cachePages.get(pageName);
        return;
    }
    const response = await axios.get(`./pages/${pageName}.html`)
    .catch(() => null);
    if(response === null){
        location.href = '#404';
    }
    else if (response.status === 200) {
        const content = response.data;
        app.contentElement.innerHTML = content;
    }
}
//Lancement de l'application
(() => {
    app.init();
})();